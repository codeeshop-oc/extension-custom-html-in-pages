import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/BrowserLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/PopupPage.vue') },
      { path: '/popup', component: () => import('pages/PopupPage.vue') },
    ],
  },
];

export default routes;
