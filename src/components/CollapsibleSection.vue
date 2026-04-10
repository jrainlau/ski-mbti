<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="collapsible-section">
    <button class="collapsible-header" @click="toggle">
      <span class="collapsible-title">{{ title }}</span>
      <span class="collapsible-toggle" :class="{ 'is-open': isOpen }">
        {{ isOpen ? '收起' : '展开' }}
      </span>
    </button>
    <Transition name="collapse">
      <div v-show="isOpen" class="collapsible-body">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.collapsible-section {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 2px 8px var(--color-shadow);
}

.collapsible-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  background: transparent;
  font-size: var(--font-size-base);
  color: var(--color-text);
  transition: background 0.2s ease;
}

.collapsible-header:hover {
  background: var(--color-bg-option);
}

.collapsible-title {
  font-weight: 600;
}

.collapsible-toggle {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
  transition: all 0.25s ease;
}

.collapsible-body {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.8;
}
</style>
