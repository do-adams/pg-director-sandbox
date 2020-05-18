import VueRouter from 'vue-router';

import Index from './pages/Index.vue';

const routes = [{ path: '/', component: Index }];

export default new VueRouter({
  routes
});
