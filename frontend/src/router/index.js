import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/containers/Main'),
    meta: {
      title: "Flatlist",
      requireUnauthenticated: true
    },
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login'),
      },
    ]
  },
  {
    path: '/register',
    component: () => import('@/containers/Main'),
    meta: {
      title: "Flatlist",
      requireUnauthenticated: true
    },
    children: [
      {
        path: '',
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
        path: 'activity',
        name: 'Activity',
        component: () => import('@/views/Activity'),
      },
      {
        path: 'members',
        name: 'Members',
        component: () => import('@/views/Dashboard'),
      },
      {
        path: '/admin',
        name: 'Admin',
        meta: {
          requireAdmin: true
        },
        component: () => import('@/views/Admin'),
      },
      {
        path: '/list/:id',
        name: 'List',
        component: () => import('@/views/ListView'),
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

  // Redirect out of login and register routes
  const requireUnauthenticated = to.matched.some(record => record.meta.requireUnauthenticated);
  if (requireUnauthenticated && store.state.Auth.authenticated) {
      return next ({ name: 'Home' });
  }

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

  // Admin middleware
  const requireAdmin = to.matched.some(record => record.meta.requireAdmin);
  if (requireAdmin && !store.state.User.admin) {
    if (from.name) {
      return next({ name: from.name });
    } else {
      return next ({ name: 'Home' });
    }
  }

  next();
})

export default router
