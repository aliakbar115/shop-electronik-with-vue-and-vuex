import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';

import { Routes } from './Routes';
import {store} from './Store/Store'

Vue.use(VueRouter);   // for plagin
Vue.use(VueResource);

Vue.http.options.root = "http://localhost:8000/api/";

const router = new VueRouter({
  routes : Routes,
  mode : 'history',  // # برای اینکه نباشد
  scrollBehavior() { //38m47  برای اینکه وقتی هر صفحه لود می شود از بالای صفحه بیاورد رفتار اسکرول را کنترل می کند
    return {
      x: 0,
      y: 0
    };
  }
});


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
