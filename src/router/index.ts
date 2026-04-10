import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('@/views/QuizPage.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('@/views/ResultPage.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
