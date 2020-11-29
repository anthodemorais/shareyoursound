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
    path: '/profile/:id',
    name: 'ProfileID',
    component: () => import('../views/ProfileID.vue'),
  },
  {
    path: '/profile/follow/:id',
    name: 'UserFollowsID',
    component: () => import('../views/UserFollowsID.vue'),
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
