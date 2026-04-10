<script setup lang="ts">
defineProps<{
  label: string
  text: string
  selected: boolean
}>()

defineEmits<{
  select: []
}>()
</script>

<template>
  <div
    class="option-item"
    :class="{ 'option-selected': selected }"
    @click="$emit('select')"
  >
    <div class="option-radio">
      <div class="radio-inner"></div>
    </div>
    <span class="option-label">{{ label }}</span>
    <span class="option-text">{{ text }}</span>
  </div>
</template>

<style scoped>
.option-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 14px var(--spacing-md);
  background: var(--color-bg-option);
  border: 1.5px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.option-item:hover {
  background: var(--color-primary-bg);
  border-color: var(--color-primary-bg-hover);
}

.option-item:active {
  transform: scale(0.99);
}

.option-selected {
  background: var(--color-primary-bg);
  border-color: var(--color-primary);
}

.option-selected:hover {
  background: var(--color-primary-bg);
}

/* Radio circle */
.option-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--color-disabled);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.option-selected .option-radio {
  border-color: var(--color-primary);
}

.radio-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: transparent;
  transition: all 0.25s ease;
  transform: scale(0);
}

.option-selected .radio-inner {
  background: var(--color-primary);
  transform: scale(1);
}

/* Label */
.option-label {
  font-weight: 700;
  font-size: var(--font-size-base);
  color: var(--color-primary-dark);
  min-width: 20px;
  flex-shrink: 0;
}

.option-text {
  font-size: var(--font-size-base);
  color: var(--color-text);
  line-height: 1.5;
}
</style>
