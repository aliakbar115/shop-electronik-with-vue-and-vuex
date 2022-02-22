import Vue from 'vue';

const state = {
  MostSellProducts: [],  // پرفروشترین محصولات
  LatestProducts: [],
  ProductImageAddress:"http://localhost:8000/images/",
  Products: {}, // در لاراول استفاده کردیم یک آبجکت می گیریم paginate چون به صورت
  SingleProduct: {},
  SuggestedProducts: []
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
  GetSingleProduct(state) {
    return state.SingleProduct;
  },
  GetSuggestedProducts(state) {
    return state.SuggestedProducts;
  }

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
  SetSingleProduct(state, singleProduct) {
    state.SingleProduct = singleProduct;
  },
  SetSuggestedProducts(state, suggestedProducts) {
    state.SuggestedProducts = suggestedProducts;
  }
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
  GetProductsFromServer(context, Filter) {   // Filter    حاوی شماره صفحه برای صفحه بندی
    Vue.http.get("product/GetProducts",{
      params:{
        page:Filter.page
      }
    })
      .then(response => {
        return response.json();
      }).then(data => {
        context.commit("SetProducts", data);
      });
  },
  GetSingleProductFromServer(context, Filter) {  // Filter  یک آبجکت حاوی آیدی محصول است که از روت گرفتیم تا بتوانیم از سرور اطلاعات را بگیریم
    Vue.http.get("product/ShowProduct/" + Filter.productId)
      .then(response => {
        return response.json();
      }).then(data => {
        context.commit("SetSingleProduct", data);
      });
  },
  GetSuggestedProductsFromServer(context) {
    Vue.http.get("product/SuggestedProducts")
      .then(response => {
        return response.json();
      }).then(data => {
        context.commit("SetSuggestedProducts", data);
      });
  }

};

export default {
  state,
  getters,
  mutations,
  actions
};
