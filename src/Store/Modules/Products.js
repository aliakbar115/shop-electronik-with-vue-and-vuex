import Vue from 'vue';

const state = {
  MostSellProducts: [],  // پرفروشترین محصولات
  LatestProducts: [],
  ProductImageAddress:"http://localhost:8000/images/",
  Products: {}, // در لاراول استفاده کردیم یک آبجکت می گیریم paginate چون به صورت




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
  },
  GetProducts(state) {
    return state.Products;
  },



};

const mutations = {
  SetMostSellProducts(state, MostSellProducts) {   // MostSellProducts  --> data   که از سرور می گیریم
    state.MostSellProducts = MostSellProducts;
  },
  SetLatestProducts(state, LatestProducts) {
    state.LatestProducts = LatestProducts;
  },
  SetProducts(state, products) {
    state.Products = products;
  },
};

const actions = {
  GetMostSellProductsFromServer(context) {
    Vue.http.get("product/mostSellProducts")
      .then(response => {
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
  },
  GetProductsFromServer(context, Filter) {
    Vue.http.get("product/GetProducts",{
      params:{
        page:Filter.page
      }
    })
      .then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
        context.commit("SetProducts", data);
      });
  },

};

export default {
  state,
  getters,
  mutations,
  actions
};
