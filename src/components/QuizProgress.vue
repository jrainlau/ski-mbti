<script setup lang="ts">
defineProps<{
  current: number
  total: number
}>()
</script>

<template>
  <div class="quiz-progress">
    <div class="progress-bar">
      <div
        class="progress-fill"
        :style="{ width: total > 0 ? (current / total * 100) + '%' : '0%' }"
      ></div>
    </div>
    <span class="progress-text">{{ current }} / {{ total }}</span>
  </div>
</template>

<style scoped>
.quiz-progress {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--color-primary-bg);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-full);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0;
}

.progress-text {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
  min-width: 50px;
  text-align: right;
}
</style>
