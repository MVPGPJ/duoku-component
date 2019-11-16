import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/v-index/v-index'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})

export default router
