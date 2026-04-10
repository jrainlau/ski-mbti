import type { Dimension } from '@/types'

export const dimensions: Dimension[] = [
  {
    id: 'T1',
    name: '技术追求度',
    category: 'T 技术取向',
    description: '你对滑雪技术的钻研程度',
    lowLabel: '佛系随缘',
    highLabel: '疯狂钻研'
  },
  {
    id: 'T2',
    name: '风格偏好',
    category: 'T 技术取向',
    description: '你的滑行风格倾向',
    lowLabel: '自由奔放',
    highLabel: '精准控制'
  },
  {
    id: 'E1',
    name: '装备投入度',
    category: 'E 装备态度',
    description: '你在装备上的投入程度',
    lowLabel: '够用就行',
    highLabel: '顶配拉满'
  },
  {
    id: 'E2',
    name: '装备研究度',
    category: 'E 装备态度',
    description: '你对装备参数的研究深度',
    lowLabel: '跟风买买',
    highLabel: '参数狂魔'
  },
  {
    id: 'S1',
    name: '雪场社交',
    category: 'S 社交属性',
    description: '你在雪场的社交模式',
    lowLabel: '独狼模式',
    highLabel: '社牛全开'
  },
  {
    id: 'S2',
    name: '分享欲',
    category: 'S 社交属性',
    description: '你分享滑雪日常的欲望',
    lowLabel: '默默滑行',
    highLabel: '出片狂魔'
  },
  {
    id: 'A1',
    name: '风险偏好',
    category: 'A 冒险精神',
    description: '你对风险和刺激的态度',
    lowLabel: '安全第一',
    highLabel: '极限玩家'
  },
  {
    id: 'A2',
    name: '探索欲',
    category: 'A 冒险精神',
    description: '你对新雪场新体验的追求',
    lowLabel: '固定主场',
    highLabel: '全球追雪'
  },
  {
    id: 'V1',
    name: '滑雪动机',
    category: 'V 氛围感',
    description: '你滑雪的核心驱动力',
    lowLabel: '运动健身',
    highLabel: '享受生活'
  },
  {
    id: 'V2',
    name: '仪式感',
    category: 'V 氛围感',
    description: '你对滑雪仪式感的追求',
    lowLabel: '随性出发',
    highLabel: '精心准备'
  }
]

export function getDimensionById(id: string): Dimension | undefined {
  return dimensions.find(d => d.id === id)
}

export function getScoreLevel(normalized: number): 'H' | 'M' | 'L' {
  if (normalized >= 7) return 'H'
  if (normalized >= 4) return 'M'
  return 'L'
}
