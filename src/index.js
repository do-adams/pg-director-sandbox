/* CSS */

import './scss/typography/_typography.scss';

// import '@fortawesome/fontawesome-free/css/all.css';
// Add fontawesome through CDN because import doesn't seem to work on codesandbox.io

import 'daemonite-material/css/material.css'; // Use the daemonite-material CSS instead of Sass styles due to: https://github.com/Daemonite/material/issues/191

import './scss/main.scss';

/* JavaScript */

import $ from 'jquery';
import 'bootstrap';
import 'daemonite-material/js/material.js';

window.$ = $;
window.jQuery = $;
