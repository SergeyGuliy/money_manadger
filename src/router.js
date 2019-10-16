import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main-layout' },
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty-layout' },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      meta: { layout: 'empty-layout' },
      component: () => import('./views/Registration.vue')
    },
    {
      path: '/details',
      name: 'details',
      meta: { layout: 'main-layout' },
      component: () => import('./views/DetailRecord.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main-layout' },
      component: () => import('./views/Histor.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: { layout: 'main-layout' },
      component: () => import('./views/Planning.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main-layout' },
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: { layout: 'main-layout' },
      component: () => import('./views/Record.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main-layout' },
      component: () => import('./views/Categories.vue')
    }
  ]
})
