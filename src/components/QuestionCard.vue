<script setup lang="ts">
import type { Question } from '@/types'
import OptionItem from './OptionItem.vue'

const props = defineProps<{
  question: Question
  index: number
  selectedOption?: string
}>()

const emit = defineEmits<{
  select: [questionId: number, optionLabel: string]
}>()

function handleSelect(label: string) {
  emit('select', props.question.id, label)
}
</script>

<template>
  <div class="question-card" :id="'q-' + question.id">
    <div class="card-header">
      <span class="question-badge">第 {{ index + 1 }} 题</span>
      <span class="dimension-hint">维度已隐藏</span>
    </div>

    <p class="question-title">{{ question.title }}</p>

    <div class="options-list">
      <OptionItem
        v-for="option in question.options"
        :key="option.label"
        :label="option.label"
        :text="option.text"
        :selected="selectedOption === option.label"
        @select="handleSelect(option.label)"
      />
    </div>
  </div>
</template>

<style scoped>
.question-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: 0 2px 8px var(--color-shadow);
  transition: box-shadow 0.3s ease;
}

.question-card:hover {
  box-shadow: 0 4px 16px var(--color-shadow-md);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.question-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-primary);
  color: var(--color-text-white);
  font-size: var(--font-size-xs);
  font-weight: 600;
  border-radius: var(--radius-full);
  letter-spacing: 0.5px;
}

.dimension-hint {
  font-size: var(--font-size-xs);
  color: var(--color-primary-light);
  font-weight: 500;
}

.question-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
