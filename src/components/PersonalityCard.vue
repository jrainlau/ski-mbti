<script setup lang="ts">
import type { Personality } from '@/types'
import avatarMap from '@/data/avatarMap'

const props = defineProps<{
  personality: Personality
  matchPercent: number
}>()

const avatarSrc = avatarMap[props.personality.code] || ''
</script>

<template>
  <div class="personality-card">
    <div class="card-left">
      <div class="avatar-wrapper" v-if="avatarSrc">
        <img :src="avatarSrc" :alt="personality.name" class="avatar-img" />
      </div>
      <p class="card-label">你的滑雪佬人格是：</p>
      <h2 class="card-code">{{ personality.code }}</h2>
      <p class="card-tagline">{{ personality.tagline }}</p>
    </div>
    <div class="card-right">
      <div class="card-right-header">
        <span class="badge-activated">🎿 滑雪人格已激活</span>
      </div>
      <h3 class="card-name">{{ personality.code }}（{{ personality.name }}）</h3>
      <div class="match-bar">
        <span class="match-label">匹配度 {{ matchPercent }}%</span>
        <div class="match-track">
          <div class="match-fill" :style="{ width: matchPercent + '%' }"></div>
        </div>
      </div>
      <p class="card-note">{{ personality.systemNote }}</p>
    </div>
  </div>
</template>

<style scoped>
.personality-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

@media (min-width: 640px) {
  .personality-card {
    grid-template-columns: 1fr 1.2fr;
  }
}

/* Left panel */
.card-left {
  background: linear-gradient(145deg, var(--color-primary-dark), var(--color-primary), var(--color-primary-light));
  color: var(--color-text-white);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
}

.avatar-wrapper {
  width: 140px;
  height: 160px;
  margin-bottom: var(--spacing-md);
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-left::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -30%;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.card-label {
  font-size: var(--font-size-sm);
  opacity: 0.85;
  margin-bottom: var(--spacing-sm);
}

.card-code {
  font-size: clamp(36px, 8vw, 48px);
  font-weight: 800;
  letter-spacing: 3px;
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.card-tagline {
  font-size: var(--font-size-base);
  opacity: 0.9;
  line-height: 1.5;
  font-style: italic;
}

/* Right panel */
.card-right {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-right-header {
  margin-bottom: var(--spacing-md);
}

.badge-activated {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  font-weight: 600;
  border-radius: var(--radius-full);
}

.card-name {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.match-bar {
  margin-bottom: var(--spacing-md);
}

.match-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-primary);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.match-track {
  height: 8px;
  background: var(--color-primary-bg);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.match-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-full);
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-note {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
}
</style>
