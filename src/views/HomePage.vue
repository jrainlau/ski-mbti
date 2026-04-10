<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { personalities } from '@/data/personalities'

const router = useRouter()
const store = useQuizStore()
const isDevMode = ref(false)

onMounted(() => {
  isDevMode.value = localStorage.getItem('ski-dev-mode') === '1'
})

function startQuiz() {
  router.push('/quiz')
}

function restartQuiz() {
  store.reset()
  router.push('/quiz')
}

function goToResult(code: string) {
  router.push({ path: '/result', query: { code } })
}
</script>

<template>
  <div class="home-page page">
    <div class="home-container">
      <!-- Floating snow particles -->
      <div class="snow-particles">
        <span v-for="i in 20" :key="i" class="particle" :style="{
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 8 + 's',
          animationDuration: (6 + Math.random() * 6) + 's',
          opacity: 0.3 + Math.random() * 0.5,
          fontSize: (8 + Math.random() * 12) + 'px'
        }">❄</span>
      </div>

      <div class="home-content">
        <div class="hero-icon">🏂⛷️</div>
        <h1 class="hero-title">滑雪佬 MBTI</h1>
        <p class="hero-subtitle">MBTI 已经过时了，滑雪佬有自己的人格测试</p>
        <p class="hero-desc">30 道趣味题目，测出你是哪种滑雪佬</p>

        <div class="hero-actions">
          <button class="btn-primary" @click="startQuiz">
            <span class="btn-icon">🏔️</span>
            {{ store.answeredCount > 0 ? '继续测试' : '开始测试' }}
          </button>
          <button
            v-if="store.answeredCount > 0"
            class="btn-secondary"
            @click="restartQuiz"
          >
            重新测试
          </button>
        </div>

        <p v-if="store.answeredCount > 0 && !store.isComplete" class="resume-hint">
          已完成 {{ store.answeredCount }} / {{ store.totalQuestions }} 题
        </p>
      </div>

      <!-- Dev mode panel -->
      <div v-if="isDevMode" class="dev-panel">
        <div class="dev-header">
          <span class="dev-badge">🔧 开发者模式</span>
          <p class="dev-hint">选择任意人格，直达结果页</p>
        </div>
        <div class="dev-grid">
          <button
            v-for="p in personalities"
            :key="p.code"
            class="dev-item"
            @click="goToResult(p.code)"
          >
            <span class="dev-code">{{ p.code }}</span>
            <span class="dev-name">{{ p.name }}</span>
          </button>
        </div>
      </div>

      <footer class="home-footer">
        <p>纯属娱乐，请勿当真 🎿</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: var(--spacing-lg);
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #eef4fc 0%, #e3edf8 30%, #f5f8fc 70%, #edf3fa 100%);
}

.home-container {
  width: 100%;
  max-width: var(--container-max-width);
  text-align: center;
  position: relative;
  z-index: 1;
}

/* Snow particles */
.snow-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  top: -20px;
  color: var(--color-primary-light);
  animation: snowfall linear infinite;
}

@keyframes snowfall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

/* Content */
.home-content {
  position: relative;
  z-index: 2;
}

.hero-icon {
  font-size: 64px;
  margin-bottom: var(--spacing-md);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-title {
  font-size: clamp(32px, 8vw, 48px);
  font-weight: 800;
  color: var(--color-primary-dark);
  letter-spacing: 2px;
  margin-bottom: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.hero-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-2xl);
}

/* Buttons */
.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: 14px 40px;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-white);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-full);
  box-shadow: 0 4px 16px rgba(74, 144, 217, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(74, 144, 217, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(74, 144, 217, 0.3);
}

.btn-icon {
  font-size: 20px;
}

.btn-secondary {
  padding: 10px 28px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  transition: all 0.25s ease;
}

.btn-secondary:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: var(--color-primary-bg);
}

.resume-hint {
  margin-top: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
}

/* Footer */
.home-footer {
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  text-align: center;
}

.home-footer p {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

@media (min-width: 768px) {
  .hero-actions {
    flex-direction: row;
    justify-content: center;
  }
}

/* Dev mode panel */
.dev-panel {
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border: 2px dashed var(--color-primary);
  border-radius: var(--radius-lg);
}

.dev-header {
  margin-bottom: var(--spacing-md);
}

.dev-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #ff6b35;
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 700;
  border-radius: var(--radius-full);
  letter-spacing: 0.5px;
}

.dev-hint {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: var(--spacing-sm);
}

.dev-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--spacing-sm);
}

.dev-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 8px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.dev-item:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-bg);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--color-shadow);
}

.dev-code {
  font-size: var(--font-size-sm);
  font-weight: 800;
  color: var(--color-primary-dark);
  letter-spacing: 1px;
}

.dev-name {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
</style>
