import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/create/:id',
    name: 'Create',
    component: Create
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('ACCESS_TOKEN')
  if (to.path !== '/auth' && !isAuthenticated) next('/auth')
  else if (to.path === '/auth' && isAuthenticated) next('/')
  else next()
})
export default router
