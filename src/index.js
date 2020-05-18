/* START CORE CSS */

import './scss/typography/_typography.scss';
// Add fontawesome through CDN because import doesn't seem to work on codesandbox.io
// import '@fortawesome/fontawesome-free/css/all.css';
import 'daemonite-material/css/material.css'; // Use the daemonite-material CSS instead of Sass styles due to: https://github.com/Daemonite/material/issues/191

import './scss/main.scss';

/* END CORE CSS */

/* START CORE JAVASCRIPT */

import $ from 'jquery';
import 'bootstrap';
import 'daemonite-material/js/material.js';

window.$ = $;
window.jQuery = $;

/* END CORE JAVASCRIPT */

/* START THIRD-PARTY JAVASCRIPT LIBRARIES */

/* END THIRD-PARTY JAVASCRIPT LIBRARIES */

/* START VUE */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;
Vue.use(VueRouter);

import router from './vue/router.js';
import App from './vue/App.vue';

new Vue({ router, render: createElement => createElement(App) }).$mount('#app');

/* END VUE */
