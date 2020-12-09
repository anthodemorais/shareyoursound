import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Media',
    component: () => import('../views/Media.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/MyProfile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/:id',
    name: 'ProfileID',
    component: () => import('../views/ProfileID.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/follows/:id',
    name: 'UserFollows',
    component: () => import('../views/UserFollows.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/followers/:id',
    name: 'UserFollowers',
    component: () => import('../views/UserFollowers.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'AllUsers',
    component: () => import('../views/AllUsers.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/music/types',
    name: 'AllType',
    component: () => import('../views/AllType.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/music/types/:id',
    name: 'Type',
    component: () => import('../views/Type.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/media/:id',
    name: 'MediaID',
    component: () => import('../views/MediaID.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/media/type/:id',
    name: 'MusicByType',
    component: () => import('../views/MusicByType.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token') || localStorage.getItem('token') === '') {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
