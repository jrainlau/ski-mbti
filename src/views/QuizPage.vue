<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { questions } from '@/data/questions'
import { hiddenQuestions } from '@/data/hiddenQuestions'
import type { Question } from '@/types'
import QuizProgress from '@/components/QuizProgress.vue'
import QuestionCard from '@/components/QuestionCard.vue'

const router = useRouter()
const store = useQuizStore()
const showToast = ref(false)

// 构建隐藏题触发索引：parentQuestionId -> HiddenQuestion[]
const hiddenByParent = computed(() => {
  const map = new Map<number, Question[]>()
  for (const hq of hiddenQuestions) {
    if (!hq.hidden) continue
    const key = hq.hidden.questionId
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(hq)
  }
  return map
})

// 某道隐藏题是否应显示
function isHiddenVisible(hq: Question): boolean {
  if (!hq.hidden) return false
  return store.getAnswer(hq.hidden.questionId) === hq.hidden.optionLabel
}

// 当前所有可见题目（主题 + 已触发的隐藏题）
const visibleQuestions = computed(() => {
  const list: Question[] = []
  for (const q of questions) {
    list.push(q)
    // 检查这道题后面有没有隐藏题需要显示
    const hiddens = hiddenByParent.value.get(q.id)
    if (hiddens) {
      for (const hq of hiddens) {
        if (isHiddenVisible(hq)) {
          list.push(hq)
        }
      }
    }
  }
  return list
})

// 总题数 = 主题 + 当前可见的隐藏题
const totalVisible = computed(() => visibleQuestions.value.length)

// 已回答数（只计可见的题目）
const answeredVisible = computed(() => {
  return visibleQuestions.value.filter(q => store.getAnswer(q.id)).length
})

// 是否全部答完
const allComplete = computed(() => answeredVisible.value >= totalVisible.value)

function handleSelect(questionId: number, optionLabel: string) {
  store.setAnswer(questionId, optionLabel)
}

function handleSubmit() {
  if (!allComplete.value) {
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 2500)
    // Scroll to first unanswered visible question
    const firstUnanswered = visibleQuestions.value.find(q => !store.getAnswer(q.id))
    if (firstUnanswered) {
      const el = document.getElementById('q-' + firstUnanswered.id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('shake')
        setTimeout(() => el.classList.remove('shake'), 600)
      }
    }
    return
  }
  router.push('/result')
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="quiz-page page">
    <!-- Sticky progress bar -->
    <div class="progress-sticky">
      <div class="container">
        <QuizProgress :current="answeredVisible" :total="totalVisible" />
      </div>
    </div>

    <!-- Questions list -->
    <div class="container quiz-body">
      <div class="questions-list">
        <TransitionGroup name="hidden-q">
          <QuestionCard
            v-for="(question, index) in visibleQuestions"
            :key="question.id"
            :question="question"
            :index="index"
            :selected-option="store.getAnswer(question.id)"
            :class="{ 'hidden-question': !!question.hidden }"
            @select="handleSelect"
          />
        </TransitionGroup>
      </div>

      <!-- Bottom action bar -->
      <div class="action-bar">
        <p class="action-hint">
          {{ allComplete ? '✅ 全部答完啦！可以提交了' : '🎿 全部答完才能提交哦，世界已经够乱了，起码把题做完' }}
        </p>
        <div class="action-buttons">
          <button class="btn-ghost" @click="goHome">返回首页</button>
          <button
            class="btn-submit"
            :class="{ 'btn-disabled': !allComplete }"
            @click="handleSubmit"
          >
            提交并查看结果
          </button>
        </div>
      </div>
    </div>

    <!-- Toast notification -->
    <Transition name="slide-up">
      <div v-if="showToast" class="toast">
        还有 {{ totalVisible - answeredVisible }} 道题没答呢！
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.quiz-page {
  background: var(--color-bg);
  padding-bottom: 0;
}

/* Sticky progress */
.progress-sticky {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 2px 8px var(--color-shadow);
}

/* Body */
.quiz-body {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-2xl);
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* Action bar */
.action-bar {
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px var(--color-shadow);
}

.action-hint {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-align: center;
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}

.btn-ghost {
  padding: 10px 24px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  background: transparent;
  border-radius: var(--radius-full);
  transition: all 0.25s ease;
}

.btn-ghost:hover {
  color: var(--color-text);
  background: var(--color-bg-option);
}

.btn-submit {
  padding: 12px 32px;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-white);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-full);
  box-shadow: 0 4px 12px rgba(74, 144, 217, 0.3);
  transition: all 0.3s ease;
}

.btn-submit:hover:not(.btn-disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(74, 144, 217, 0.4);
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  background: rgba(26, 26, 26, 0.9);
  color: white;
  font-size: var(--font-size-sm);
  font-weight: 500;
  border-radius: var(--radius-full);
  z-index: var(--z-toast);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}

/* Shake animation for unanswered questions */
:global(.shake) {
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}

/* Hidden question style */
.hidden-question {
  border-left: 3px solid var(--color-primary);
  margin-left: 12px;
  position: relative;
}

.hidden-question::before {
  content: '🔓 隐藏题';
  position: absolute;
  top: -10px;
  left: 12px;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary);
  background: var(--color-primary-bg);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  z-index: 1;
}

/* TransitionGroup animations for hidden questions */
.hidden-q-enter-active {
  transition: all 0.4s ease-out;
}

.hidden-q-leave-active {
  transition: all 0.3s ease-in;
}

.hidden-q-enter-from {
  opacity: 0;
  transform: translateY(-16px) scale(0.97);
  max-height: 0;
}

.hidden-q-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.hidden-q-move {
  transition: transform 0.4s ease;
}
</style>
