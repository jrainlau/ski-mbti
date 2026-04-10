<script setup lang="ts">
</script>

<template>
  <div id="ski-app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
#ski-app {
  min-height: 100vh;
  min-height: 100dvh;
}
</style>
