import Vue from 'vue';

const state = {
  MostSellProducts: [],  // پرفروشترین محصولات
  LatestProducts: [],
  ProductImageAddress:"http://localhost:8000/images/"
};


const getters = {
  GetMostSellProducts(state) {
    return state.MostSellProducts;
  },
  GetLatestProducts(state) {
    return state.LatestProducts;
  },
  GetProductImageAddress(state){
    return state.ProductImageAddress;
  }
};

const mutations = {
  SetMostSellProducts(state, MostSellProducts) {   // MostSellProducts  --> data   که از سرور می گیریم
    state.MostSellProducts = MostSellProducts;
  },
  SetLatestProducts(state, LatestProducts) {
    state.LatestProducts = LatestProducts;
  }
};

const actions = {
  GetMostSellProductsFromServer(context) {
    Vue.http.get("product/mostSellProducts")
      .then(response => {
        console.log(response);
        return response.json();
      }).then(data => {
        context.commit("SetMostSellProducts", data);
      });
  },
  GetLatestProductsFromServer(context) {
    Vue.http.get("product/latestProducts")
      .then(response => {
        return response.json();
      }).then(data => {
        context.commit("SetLatestProducts", data);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
