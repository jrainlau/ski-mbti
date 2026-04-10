import type { MatchResult } from '@/types'
import { getDimensionById } from '@/data/dimensions'
import avatarMap from '@/data/avatarMap'
import qrcodeImg from '@/assets/qrcode.png'

const W = 750 // 2x for retina (logical 375)
const PAD = 48
const CONTENT_W = W - PAD * 2
const RADIUS = 28

/** 圆角矩形路径 */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

/** 绘制文字换行，返回实际绘制高度 */
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const chars = text.split('')
  let line = ''
  let curY = y

  for (const char of chars) {
    const testLine = line + char
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line, x, curY)
      line = char
      curY += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, x, curY)
  return curY + lineHeight - y
}

/** 加载图片 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/** SVG 转为可绘制的 Image（通过 Blob URL） */
async function loadSvgAsImage(svgUrl: string): Promise<HTMLImageElement> {
  const resp = await fetch(svgUrl)
  const svgText = await resp.text()
  const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  try {
    const img = await loadImage(url)
    return img
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function generatePosterCanvas(result: MatchResult): Promise<HTMLCanvasElement> {
  const { personality, matchPercent, dimensionScores } = result
  const avatarSrc = avatarMap[personality.code] || ''

  // 预加载图片
  const [avatarImg, qrImg] = await Promise.all([
    avatarSrc ? loadSvgAsImage(avatarSrc).catch(() => null) : Promise.resolve(null),
    loadImage(qrcodeImg).catch(() => null)
  ])

  // ---------- 先计算总高度 ----------
  const tmpCanvas = document.createElement('canvas')
  tmpCanvas.width = W
  tmpCanvas.height = 100
  const tmpCtx = tmpCanvas.getContext('2d')!
  tmpCtx.font = '26px "PingFang SC", sans-serif'

  // 计算描述文本高度
  const descLineH = 40
  const descTextW = CONTENT_W - 64
  let descH = 0
  {
    const chars = personality.description.split('')
    let line = ''
    let lines = 1
    for (const char of chars) {
      const testLine = line + char
      if (tmpCtx.measureText(testLine).width > descTextW && line !== '') {
        lines++
        line = char
      } else {
        line = testLine
      }
    }
    descH = lines * descLineH
  }

  // Header 区域高度
  const avatarH = avatarImg ? 240 : 0
  const headerH = 56 + avatarH + 28 + 84 + 10 + 36 + 16 + 30 + 24 + 56 + 56

  // 描述区域高度
  const descSectionH = 32 + descH + 32

  // 维度区域高度
  const dimRows = Math.ceil(dimensionScores.length / 2)
  const dimSectionH = 32 + 36 + 24 + dimRows * 56 + 32

  // Footer 高度（简化：只有一行文字）
  const footerH = 60

  const totalH = PAD + headerH + 40 + descSectionH + 40 + dimSectionH + 40 + footerH + PAD

  // ---------- 开始绘制 ----------
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = totalH
  const ctx = canvas.getContext('2d')!

  // 背景
  ctx.fillStyle = '#F5F8FC'
  ctx.fillRect(0, 0, W, totalH)

  let curY = PAD

  // ===== Header 区域 =====
  const headerStartY = curY
  const grad = ctx.createLinearGradient(PAD, curY, PAD + CONTENT_W, curY + headerH)
  grad.addColorStop(0, '#3670B5')
  grad.addColorStop(0.5, '#4A90D9')
  grad.addColorStop(1, '#6BB0F0')
  roundRect(ctx, PAD, curY, CONTENT_W, headerH, RADIUS)
  ctx.fillStyle = grad
  ctx.fill()

  curY += 56

  // Label
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.font = '26px "PingFang SC", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('🎿 滑雪佬人格测试', W / 2, curY)
  curY += 28

  // Avatar
  if (avatarImg) {
    const aw = 200
    const ah = 240
    const avatarX = (W - aw) / 2
    ctx.drawImage(avatarImg, avatarX, curY, aw, ah)
    curY += ah + 16
  }

  // QR code at bottom-right corner of header card
  if (qrImg) {
    const qrSize = 80
    const qrX = PAD + CONTENT_W - qrSize - 20
    const qrY2 = headerStartY + headerH - qrSize - 20
    // 白色背景 + 圆角
    roundRect(ctx, qrX - 4, qrY2 - 4, qrSize + 8, qrSize + 8, 12)
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
    // 绘制二维码
    ctx.save()
    roundRect(ctx, qrX, qrY2, qrSize, qrSize, 10)
    ctx.clip()
    ctx.drawImage(qrImg, qrX, qrY2, qrSize, qrSize)
    ctx.restore()
  }

  // Code
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '800 84px "PingFang SC", sans-serif'
  ctx.fillText(personality.code, W / 2, curY + 70)
  curY += 84 + 10

  // Name
  ctx.font = '600 36px "PingFang SC", sans-serif'
  ctx.fillText(personality.name, W / 2, curY + 30)
  curY += 36 + 16

  // Tagline
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.font = 'italic 28px "PingFang SC", sans-serif'
  ctx.fillText(personality.tagline, W / 2, curY + 24)
  curY += 30 + 24

  // Match badge
  const matchText = `匹配度 ${matchPercent}%`
  const matchTextW = ctx.measureText(matchText).width
  const badgeW = matchTextW + 40
  const badgeH = 48
  const badgeX = (W - badgeW) / 2
  roundRect(ctx, badgeX, curY, badgeW, badgeH, 24)
  ctx.fillStyle = 'rgba(255,255,255,0.2)'
  ctx.fill()
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '600 28px "PingFang SC", sans-serif'
  ctx.fillText(matchText, W / 2, curY + 33)
  curY += badgeH + 56

  curY = headerStartY + headerH + 40

  // ===== Description 区域 =====
  roundRect(ctx, PAD, curY, CONTENT_W, descSectionH, RADIUS)
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.fillStyle = '#4a4a4a'
  ctx.font = '26px "PingFang SC", sans-serif'
  ctx.textAlign = 'left'
  drawWrappedText(ctx, personality.description, PAD + 32, curY + 32 + 22, descTextW, descLineH)

  curY += descSectionH + 40

  // ===== Dimension 区域 =====
  const dimStartY = curY
  roundRect(ctx, PAD, curY, CONTENT_W, dimSectionH, RADIUS)
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 2
  ctx.stroke()

  curY += 32
  ctx.fillStyle = '#1a1a1a'
  ctx.font = '700 32px "PingFang SC", sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('📊 十维度评分', PAD + 32, curY + 26)
  curY += 36 + 24

  // 绘制维度网格
  const colW = (CONTENT_W - 64 - 20) / 2
  for (let i = 0; i < dimensionScores.length; i++) {
    const score = dimensionScores[i]
    const col = i % 2
    const row = Math.floor(i / 2)
    const ix = PAD + 32 + col * (colW + 20)
    const iy = curY + row * 56

    // 背景
    roundRect(ctx, ix, iy, colW, 46, 12)
    ctx.fillStyle = '#f3f6fa'
    ctx.fill()

    // ID badge
    const idText = score.dimensionId
    ctx.font = '700 22px "PingFang SC", sans-serif'
    const idW = ctx.measureText(idText).width + 16
    roundRect(ctx, ix + 10, iy + 10, idW, 26, 6)
    ctx.fillStyle = '#E3F0FD'
    ctx.fill()
    ctx.fillStyle = '#4A90D9'
    ctx.textAlign = 'left'
    ctx.fillText(idText, ix + 18, iy + 31)

    // Score
    ctx.fillStyle = '#1a1a1a'
    ctx.font = '600 26px "PingFang SC", sans-serif'
    ctx.fillText(`${Math.round(score.normalized)}/10`, ix + 18 + idW + 10, iy + 32)

    // Level badge
    const levelColors: Record<string, string> = { H: '#4A90D9', M: '#e6a23c', L: '#999999' }
    const levelColor = levelColors[score.level] || '#999'
    const levelText = score.level
    ctx.font = '700 22px "PingFang SC", sans-serif'
    const levelW = ctx.measureText(levelText).width + 16
    const levelX = ix + colW - levelW - 10
    roundRect(ctx, levelX, iy + 10, levelW, 26, 6)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.strokeStyle = levelColor
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = levelColor
    ctx.textAlign = 'center'
    ctx.fillText(levelText, levelX + levelW / 2, iy + 31)
  }

  curY = dimStartY + dimSectionH + 40

  // ===== Footer 文字 =====
  ctx.fillStyle = '#999'
  ctx.font = '22px "PingFang SC", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('扫描海报中的二维码，测测你的滑雪佬人格 🎿', W / 2, curY + 30)

  return canvas
}
