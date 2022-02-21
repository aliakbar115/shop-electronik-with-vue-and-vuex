import Vue from 'vue';
import Vuex from 'vuex';

import Slider from './Modules/Slider'
import Products from './Modules/Products'
Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {},
  modules: {
    Slider, Products
  }

})
