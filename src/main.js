import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue';

import { Routes } from './Routes';

Vue.use(VueRouter);   // for plagin
const router = new VueRouter({
  routes : Routes,
  mode : 'history'  // # برای اینکه نباشد
});


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
