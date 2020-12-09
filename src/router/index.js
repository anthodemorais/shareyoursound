import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
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
  },
  {
    path: '/profile/follows/:id',
    name: 'UserFollows',
    component: () => import('../views/UserFollows.vue'),
  },
  {
    path: '/profile/followers/:id',
    name: 'UserFollowers',
    component: () => import('../views/UserFollowers.vue'),
  },
  {
    path: '/profile/:id',
    name: 'ProfileID',
    component: () => import('../views/ProfileID.vue'),
  },
  {
    path: '/users',
    name: 'AllUsers',
    component: () => import('../views/AllUsers.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/music/types',
    name: 'AllType',
    component: () => import('../views/AllType.vue'),
  },
  {
    path: '/music/types/:id',
    name: 'Type',
    component: () => import('../views/Type.vue'),
  },
  {
    path: '/media',
    name: 'Media',
    component: () => import('../views/Media.vue'),
  },
  {
    path: '/media/:id',
    name: 'MediaID',
    component: () => import('../views/MediaID.vue'),
  },
  {
    path: '/media/type/:id',
    name: 'MusicByType',
    component: () => import('../views/MusicByType.vue'),
  },
  {
    path: '/liked/media',
    name: 'LikedMedia',
    component: () => import('../views/LikedMedia.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/liked/type',
    name: 'LikedTypes',
    component: () => import('../views/LikedTypes.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
