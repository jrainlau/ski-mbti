import type { UserAnswer, DimensionScore, MatchResult, Personality } from '@/types'
import { questions } from '@/data/questions'
import { hiddenQuestions } from '@/data/hiddenQuestions'
import { dimensions, getScoreLevel } from '@/data/dimensions'
import { personalities } from '@/data/personalities'

/** 全部题目（主题 + 隐藏题），用于评分 */
const allQuestions = [...questions, ...hiddenQuestions]

/**
 * 根据用户答案计算各维度原始得分
 */
export function calculateRawScores(answers: UserAnswer[]): Record<string, number> {
  const scores: Record<string, number> = {}
  // 初始化所有维度为 0
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
 * 计算每个维度的最大可能得分
 * 传入用户实际回答的 answers，只统计用户作答的题目
 */
export function calculateMaxScores(answers: UserAnswer[]): Record<string, number> {
  const maxScores: Record<string, number> = {}
  for (const dim of dimensions) {
    maxScores[dim.id] = 0
  }

  // 收集用户实际回答了的题目 ID
  const answeredIds = new Set(answers.map(a => a.questionId))

  for (const question of allQuestions) {
    // 只计算用户实际回答了的题目
    if (!answeredIds.has(question.id)) continue
    // 对于每道题的每个维度，取选项中最高分
    const dimMaxInQuestion: Record<string, number> = {}

    for (const option of question.options) {
      for (const weight of option.weights) {
        if (!dimMaxInQuestion[weight.dimensionId] || weight.score > dimMaxInQuestion[weight.dimensionId]) {
          dimMaxInQuestion[weight.dimensionId] = weight.score
        }
      }
    }

    for (const [dimId, max] of Object.entries(dimMaxInQuestion)) {
      if (maxScores[dimId] !== undefined) {
        maxScores[dimId] += max
      }
    }
  }

  return maxScores
}

/**
 * 归一化到 0-10 分
 */
export function normalizeScore(raw: number, max: number): number {
  if (max === 0) return 5
  const normalized = (raw / max) * 10
  return Math.round(Math.min(10, Math.max(0, normalized)) * 10) / 10
}

/**
 * 计算与人格模板的余弦相似度
 */
function cosineSimilarity(userVector: number[], templateVector: number[]): number {
  let dotProduct = 0
  let userMagnitude = 0
  let templateMagnitude = 0

  for (let i = 0; i < userVector.length; i++) {
    dotProduct += userVector[i] * templateVector[i]
    userMagnitude += userVector[i] * userVector[i]
    templateMagnitude += templateVector[i] * templateVector[i]
  }

  userMagnitude = Math.sqrt(userMagnitude)
  templateMagnitude = Math.sqrt(templateMagnitude)

  if (userMagnitude === 0 || templateMagnitude === 0) return 0
  return dotProduct / (userMagnitude * templateMagnitude)
}

/**
 * 匹配最合适的人格类型
 */
export function matchPersonality(answers: UserAnswer[]): MatchResult {
  const rawScores = calculateRawScores(answers)
  const maxScores = calculateMaxScores(answers)

  // 归一化得分
  const normalizedScores: Record<string, number> = {}
  for (const dim of dimensions) {
    normalizedScores[dim.id] = normalizeScore(rawScores[dim.id], maxScores[dim.id])
  }

  // 构建用户向量
  const dimIds = dimensions.map(d => d.id)
  const userVector = dimIds.map(id => normalizedScores[id])

  // 计算与每个人格的匹配度
  let bestMatch: Personality = personalities[0]
  let bestSimilarity = -1

  const allSimilarities: { personality: Personality; similarity: number }[] = []

  for (const personality of personalities) {
    const templateVector = dimIds.map(id => personality.template[id] ?? 5)
    const similarity = cosineSimilarity(userVector, templateVector)
    allSimilarities.push({ personality, similarity })

    if (similarity > bestSimilarity) {
      bestSimilarity = similarity
      bestMatch = personality
    }
  }

  // 计算匹配度百分比（将余弦相似度映射到 60%-100% 区间，更好看）
  const matchPercent = Math.round((60 + bestSimilarity * 40) * 10) / 10

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
