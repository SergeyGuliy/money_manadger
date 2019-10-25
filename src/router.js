import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main-layout', auth: true },
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
      path: '/detail/:id',
      name: 'detail',
      meta: { layout: 'main-layout', auth: true },
      component: () => import('./views/DetailRecord.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main-layout', auth: true },
      component: () => import('./views/Histor.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: { layout: 'main-layout', auth: true },
      component: () => import('./views/Planning.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main-layout', auth: true },
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: { layout: 'main-layout', auth: true },
      component: () => import('./views/Record.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main-layout', auth: true },
      component: () => import('./views/Categories.vue')
    }
  ]
})

router.beforeEach(function (to, from, next) {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(function (record) {
    return record.meta.auth
  })
  if (requireAuth && !currentUser) {
    next('/login?message=loginNeed')
  } else {
    next()
  }
})

export default router
