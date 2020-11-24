import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    component: () => import('@/containers/Main'),
    meta: {
      title: "Flatlist",
    },
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Register'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/containers/Main'),
    meta: {
      title: "Flatlist",
      requireAuthenticated: true
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Dashboard'),
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/Admin'),
      },
      {
        path: '/logout',
        name: 'Logout',
        async beforeEnter(to, from, next) {
          await store.dispatch('Auth/delToken');
          await store.dispatch('Auth/delAuthenticated');
          await store.dispatch('User/delUser');
          next({ name: 'Login' });
        }
      },
    ]
  },
  {
    path: '*',
    redirect: { name: 'Home' }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(async(to, from, next) => {
  // Set route titles from meta tags
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Authenticated Middleware
  const requireAuthenticated = to.matched.some(record => record.meta.requireAuthenticated);
  if (requireAuthenticated && store.state.Auth.authenticated == false) {
    store.getters['Auth/checkAuthenticated']
    .then((response) => {
      if (!response) {
        return next({ name: 'Login' })
      }
    });
  }

  next();
})

export default router
