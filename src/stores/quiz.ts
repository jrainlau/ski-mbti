import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserAnswer, MatchResult } from '@/types'
import { questions } from '@/data/questions'
import { hiddenQuestions } from '@/data/hiddenQuestions'
import { matchPersonality } from '@/utils/scoring'

const STORAGE_KEY = 'ski-mbti-answers'

function loadAnswers(): UserAnswer[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // ignore parse errors
  }
  return []
}

function saveAnswers(answers: UserAnswer[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  } catch {
    // ignore storage errors
  }
}

export const useQuizStore = defineStore('quiz', () => {
  // State
  const answers = ref<UserAnswer[]>(loadAnswers())

  // 当前可见的隐藏题（根据已有答案触发）
  const visibleHiddenQuestions = computed(() => {
    return hiddenQuestions.filter(hq => {
      if (!hq.hidden) return false
      return getAnswer(hq.hidden.questionId) === hq.hidden.optionLabel
    })
  })

  // 所有可见题目数量（主题 + 已触发的隐藏题）
  const totalQuestions = computed(() => questions.length + visibleHiddenQuestions.value.length)

  const answeredCount = computed(() => {
    // 只计算可见题目中已回答的数量
    const visibleIds = new Set([
      ...questions.map(q => q.id),
      ...visibleHiddenQuestions.value.map(hq => hq.id)
    ])
    return answers.value.filter(a => visibleIds.has(a.questionId)).length
  })

  const isComplete = computed(() => answeredCount.value >= totalQuestions.value)

  const progress = computed(() => {
    if (totalQuestions.value === 0) return 0
    return Math.round((answeredCount.value / totalQuestions.value) * 100)
  })

  const result = computed<MatchResult | null>(() => {
    if (!isComplete.value) return null
    return matchPersonality(answers.value)
  })

  // Actions
  function getAnswer(questionId: number): string | undefined {
    const answer = answers.value.find(a => a.questionId === questionId)
    return answer?.optionLabel
  }

  function setAnswer(questionId: number, optionLabel: string) {
    const existingIndex = answers.value.findIndex(a => a.questionId === questionId)
    if (existingIndex >= 0) {
      answers.value[existingIndex].optionLabel = optionLabel
    } else {
      answers.value.push({ questionId, optionLabel })
    }

    // 如果这道题是某些隐藏题的触发题，且选项变了，清除不再可见的隐藏题答案
    const relatedHidden = hiddenQuestions.filter(hq => hq.hidden?.questionId === questionId)
    for (const hq of relatedHidden) {
      if (hq.hidden!.optionLabel !== optionLabel) {
        // 该隐藏题不再可见，清除其答案
        const idx = answers.value.findIndex(a => a.questionId === hq.id)
        if (idx >= 0) {
          answers.value.splice(idx, 1)
        }
      }
    }

    saveAnswers(answers.value)
  }

  function reset() {
    answers.value = []
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return {
    answers,
    totalQuestions,
    answeredCount,
    isComplete,
    progress,
    result,
    getAnswer,
    setAnswer,
    reset
  }
})
