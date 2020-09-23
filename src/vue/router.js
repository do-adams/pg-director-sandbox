import VueRouter from 'vue-router';

import AppBar from './pages/AppBar.vue';

const routes = [
  {
    path: '/',
    component: AppBar
  }
];

export default new VueRouter({
  routes
});
