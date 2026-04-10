<script setup lang="ts">
import type { DimensionScore } from '@/types'
import { getDimensionById } from '@/data/dimensions'

defineProps<{
  scores: DimensionScore[]
}>()

function getLevelColor(level: 'H' | 'M' | 'L') {
  switch (level) {
    case 'H': return '#4A90D9'
    case 'M': return '#e6a23c'
    case 'L': return '#999999'
  }
}
</script>

<template>
  <div class="dimension-list">
    <h3 class="section-title">📊 十维度评分</h3>
    <div class="dim-items">
      <div
        v-for="score in scores"
        :key="score.dimensionId"
        class="dim-item"
      >
        <div class="dim-header">
          <div class="dim-info">
            <span class="dim-id">{{ score.dimensionId }}</span>
            <span class="dim-name">{{ getDimensionById(score.dimensionId)?.name || score.dimensionId }}</span>
          </div>
          <div class="dim-score">
            <span
              class="dim-level"
              :style="{ color: getLevelColor(score.level), borderColor: getLevelColor(score.level) }"
            >
              {{ score.level }}
            </span>
            <span class="dim-value">/ {{ Math.round(score.normalized) }}分</span>
          </div>
        </div>
        <p class="dim-comment">{{ score.comment }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dimension-list {
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
  margin-bottom: var(--spacing-lg);
}

.dim-items {
  display: flex;
  flex-direction: column;
}

.dim-item {
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-border);
}

.dim-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.dim-item:first-child {
  padding-top: 0;
}

.dim-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-xs);
}

.dim-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.dim-id {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-bg);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.dim-name {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.dim-score {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.dim-level {
  font-size: var(--font-size-sm);
  font-weight: 700;
  border: 1.5px solid;
  padding: 1px 8px;
  border-radius: var(--radius-sm);
}

.dim-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.dim-comment {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.5;
}
</style>
