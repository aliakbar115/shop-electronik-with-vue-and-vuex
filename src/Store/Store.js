import Vue from 'vue';
import Vuex from 'vuex';

import Slider from './Modules/Slider'
import Products from './Modules/Products'
import User from './Modules/User'
import Order from './Modules/Order'
Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {},
  modules: {
    Slider, Products, User, Order
  }

})
