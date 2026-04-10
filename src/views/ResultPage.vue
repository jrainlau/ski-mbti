<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { personalities } from '@/data/personalities'
import { dimensions, getScoreLevel } from '@/data/dimensions'
import type { MatchResult } from '@/types'
import PersonalityCard from '@/components/PersonalityCard.vue'
import DimensionList from '@/components/DimensionList.vue'
import CollapsibleSection from '@/components/CollapsibleSection.vue'
import { generatePosterCanvas } from '@/utils/poster'

const router = useRouter()
const route = useRoute()
const store = useQuizStore()

const showContent = ref(false)
const isGenerating = ref(false)

// 支持开发者模式：通过 ?code=XXX 直达某个人格
const devCode = route.query.code as string | undefined

const result = computed<MatchResult | null>(() => {
  if (devCode) {
    const personality = personalities.find(p => p.code === devCode)
    if (!personality) return null
    const dimensionScores = dimensions.map(dim => {
      const raw = personality.template[dim.id] ?? 5
      const normalized = Math.max(0, Math.min(10, raw))
      return {
        dimensionId: dim.id,
        rawScore: normalized,
        maxScore: 10,
        normalized,
        level: getScoreLevel(normalized),
        comment: personality.dimensionComments[dim.id] || ''
      }
    })
    return {
      personality,
      matchPercent: 95,
      dimensionScores
    }
  }
  return store.result
})

// If no result (user navigated directly), redirect to home
if (!result.value) {
  router.replace('/')
}

onMounted(() => {
  requestAnimationFrame(() => {
    showContent.value = true
  })
})

function restartQuiz() {
  store.reset()
  router.push('/quiz')
}

function goHome() {
  router.push('/')
}

async function generatePoster() {
  if (!result.value || isGenerating.value) return
  isGenerating.value = true

  try {
    const canvas = await generatePosterCanvas(result.value)
    const link = document.createElement('a')
    link.download = `ski-mbti-${result.value.personality.code || 'result'}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (e) {
    console.error('生成海报失败:', e)
    alert('海报生成失败，请重试')
  } finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <div class="result-page page" v-if="result">
    <div class="container result-container" :class="{ 'show': showContent }">
      <!-- Personality card -->
      <div class="anim-item" style="--delay: 0">
        <PersonalityCard
          :personality="result.personality"
          :match-percent="result.matchPercent"
        />
      </div>

      <!-- Description -->
      <div class="anim-item result-section description-section" style="--delay: 1">
        <h3 class="section-title">🏔️ 这类滑雪佬的简单解读</h3>
        <p class="description-text">{{ result.personality.description }}</p>
      </div>

      <!-- Dimension scores -->
      <div class="anim-item" style="--delay: 2">
        <DimensionList :scores="result.dimensionScores" />
      </div>

      <!-- Disclaimer -->
      <div class="anim-item disclaimer-section" style="--delay: 3">
        <h4 class="disclaimer-title">💡 友情提示</h4>
        <p class="disclaimer-text">
          本测试仅供娱乐和交流使用，结果不具有任何科学或心理学诊断意义。
          每个人都是独特的滑雪佬，不要被标签所定义。
          无论你是哪种类型，享受滑雪的过程才是最重要的！
          请注意滑雪安全，量力而行。
        </p>
      </div>

      <!-- Author note -->
      <div class="anim-item" style="--delay: 4">
        <CollapsibleSection title="📝 作者的话">
          <p>
            这个小测试纯属娱乐，灵感来自于每次去雪场观察到的各种有趣的雪友类型。
            我们每个人身上可能都有好几种类型的影子，毕竟人是复杂的嘛。
          </p>
          <p style="margin-top: 12px;">
            如果你觉得测试结果"太准了"或者"完全不准"，都很正常。
            重要的是——这个冬天，你滑雪了吗？🎿
          </p>
        </CollapsibleSection>
      </div>

      <!-- Action buttons -->
      <div class="anim-item result-actions" style="--delay: 5">
        <button class="btn-poster" @click="generatePoster" :disabled="isGenerating">
          {{ isGenerating ? '⏳ 生成中...' : '🖼️ 生成海报' }}
        </button>
        <button class="btn-outline" @click="restartQuiz">🔄 重新测试</button>
        <button class="btn-solid" @click="goHome">🏠 回到首页</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-page {
  background: var(--color-bg);
}

.result-container {
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* Entrance animation */
.anim-item {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: calc(var(--delay, 0) * 0.12s);
}

.show .anim-item {
  opacity: 1;
  transform: translateY(0);
}

/* Description section */
.result-section {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: 0 2px 8px var(--color-shadow);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.description-text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

/* Disclaimer */
.disclaimer-section {
  background: var(--color-bg-section);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.disclaimer-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.disclaimer-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.7;
}

/* Action buttons */
.result-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding-top: var(--spacing-md);
}

@media (max-width: 640px) {
  .result-actions {
    flex-direction: column;
  }
  .result-actions .btn-poster,
  .result-actions .btn-outline,
  .result-actions .btn-solid {
    width: 100%;
    max-width: 280px;
    text-align: center;
  }
}

.btn-outline {
  padding: 12px 28px;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-primary);
  background: transparent;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-full);
  transition: all 0.25s ease;
}

.btn-outline:hover {
  background: var(--color-primary-bg);
}

.btn-solid {
  padding: 12px 28px;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-white);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-full);
  box-shadow: 0 4px 12px rgba(74, 144, 217, 0.3);
  transition: all 0.3s ease;
}

.btn-solid:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(74, 144, 217, 0.4);
}

/* Poster button */
.btn-poster {
  padding: 12px 28px;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  border-radius: var(--radius-full);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  transition: all 0.3s ease;
}

.btn-poster:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
}

.btn-poster:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
