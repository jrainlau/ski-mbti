import type { UserAnswer, DimensionScore, MatchResult, Personality } from '@/types'
import { questions } from '@/data/questions'
import { hiddenQuestions } from '@/data/hiddenQuestions'
import { dimensions, getScoreLevel } from '@/data/dimensions'
import { personalities } from '@/data/personalities'

/** 全部题目（主题 + 隐藏题），用于评分 */
const allQuestions = [...questions, ...hiddenQuestions]

/**
 * 根据用户答案计算各维度原始得分（支持负分）
 */
export function calculateRawScores(answers: UserAnswer[]): Record<string, number> {
  const scores: Record<string, number> = {}
  for (const dim of dimensions) {
    scores[dim.id] = 0
  }

  for (const answer of answers) {
    const question = allQuestions.find(q => q.id === answer.questionId)
    if (!question) continue

    const option = question.options.find(o => o.label === answer.optionLabel)
    if (!option) continue

    for (const weight of option.weights) {
      if (scores[weight.dimensionId] !== undefined) {
        scores[weight.dimensionId] += weight.score
      }
    }
  }

  return scores
}

/**
 * 计算每个维度的最大和最小可能得分
 * 只统计用户实际作答的题目
 */
export function calculateScoreRange(answers: UserAnswer[]): {
  maxScores: Record<string, number>
  minScores: Record<string, number>
} {
  const maxScores: Record<string, number> = {}
  const minScores: Record<string, number> = {}
  for (const dim of dimensions) {
    maxScores[dim.id] = 0
    minScores[dim.id] = 0
  }

  const answeredIds = new Set(answers.map(a => a.questionId))

  for (const question of allQuestions) {
    if (!answeredIds.has(question.id)) continue

    // 对于每道题的每个维度，取选项中最高分和最低分
    const dimMaxInQ: Record<string, number> = {}
    const dimMinInQ: Record<string, number> = {}

    for (const option of question.options) {
      for (const weight of option.weights) {
        const dim = weight.dimensionId
        if (dimMaxInQ[dim] === undefined || weight.score > dimMaxInQ[dim]) {
          dimMaxInQ[dim] = weight.score
        }
        if (dimMinInQ[dim] === undefined || weight.score < dimMinInQ[dim]) {
          dimMinInQ[dim] = weight.score
        }
      }
    }

    for (const [dimId, max] of Object.entries(dimMaxInQ)) {
      if (maxScores[dimId] !== undefined) {
        maxScores[dimId] += max
      }
    }
    for (const [dimId, min] of Object.entries(dimMinInQ)) {
      if (minScores[dimId] !== undefined) {
        // 只累积负分贡献（正分的最小贡献为 0，即不选该维度）
        if (min < 0) {
          minScores[dimId] += min
        }
      }
    }
  }

  return { maxScores, minScores }
}

/**
 * 归一化到 0-10 分（支持负分原始分）
 * raw 可以是负数，min 可以是负数，max 是正数
 */
export function normalizeScore(raw: number, min: number, max: number): number {
  const range = max - min
  if (range === 0) return 5
  const normalized = ((raw - min) / range) * 10
  return Math.round(Math.min(10, Math.max(0, normalized)) * 10) / 10
}

/**
 * 加权欧氏距离（keyDimensions 权重翻倍）
 */
function weightedEuclideanDistance(
  userVector: number[],
  templateVector: number[],
  dimIds: string[],
  keyDimensions: string[]
): number {
  const keySet = new Set(keyDimensions)
  let sumSquares = 0
  for (let i = 0; i < userVector.length; i++) {
    const diff = userVector[i] - templateVector[i]
    const weight = keySet.has(dimIds[i]) ? 2.0 : 1.0
    sumSquares += weight * diff * diff
  }
  return Math.sqrt(sumSquares)
}

/**
 * 匹配最合适的人格类型
 */
export function matchPersonality(answers: UserAnswer[]): MatchResult {
  const rawScores = calculateRawScores(answers)
  const { maxScores, minScores } = calculateScoreRange(answers)

  // 归一化得分（0-10 区间）
  const normalizedScores: Record<string, number> = {}
  for (const dim of dimensions) {
    normalizedScores[dim.id] = normalizeScore(
      rawScores[dim.id],
      minScores[dim.id],
      maxScores[dim.id]
    )
  }

  // 构建用户向量
  const dimIds = dimensions.map(d => d.id)
  const userVector = dimIds.map(id => normalizedScores[id])

  // 计算与每个人格的加权欧氏距离
  let bestMatch: Personality = personalities[0]
  let bestDistance = Infinity

  // 计算理论最大距离（用于归一化百分比）
  // 考虑加权，最坏情况下关键维度差10、权重2
  const maxPossibleDistance = Math.sqrt(
    dimensions.length * 100 + dimensions.length * 100 // 保守估计
  )

  for (const personality of personalities) {
    const templateVector = dimIds.map(id => {
      const val = personality.template[id] ?? 5
      // 模板也归一化到 0-10 区间（模板本身就是 0-10 的设计值）
      return val
    })

    const distance = weightedEuclideanDistance(
      userVector,
      templateVector,
      dimIds,
      personality.keyDimensions
    )

    if (distance < bestDistance) {
      bestDistance = distance
      bestMatch = personality
    }
  }

  // 计算匹配度百分比：距离越小匹配度越高，映射到 60%-98% 区间
  const similarity = Math.max(0, 1 - (bestDistance / maxPossibleDistance))
  const matchPercent = Math.round((60 + similarity * 38) * 10) / 10

  // 构建维度得分列表
  const dimensionScores: DimensionScore[] = dimensions.map(dim => {
    const normalized = normalizedScores[dim.id]
    const level = getScoreLevel(normalized)
    const comment = bestMatch.dimensionComments[dim.id] || ''
    return {
      dimensionId: dim.id,
      rawScore: rawScores[dim.id],
      maxScore: maxScores[dim.id],
      normalized,
      level,
      comment
    }
  })

  return {
    personality: bestMatch,
    matchPercent,
    dimensionScores
  }
}
