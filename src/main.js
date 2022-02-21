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
  mode : 'history'  // # برای اینکه نباشد
});


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
