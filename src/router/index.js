import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/profil',
    name: 'Profile',
    component: () => import('../views/MyProfil.vue'),
  },
  {
    path: '/profil/:id(\\d+)',
    name: 'ProfileId',
    component: () => import('../views/ProfilId.vue'),
  },
  {
    path: '/profile/:id(\\d+)',
    name: 'ProfileID',
    component: () => import('../views/ProfileID.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
