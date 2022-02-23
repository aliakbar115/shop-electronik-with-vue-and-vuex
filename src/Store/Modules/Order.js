import Vue from 'vue';

const state = {
  UserShopCart: {},
  TotalPrice: 0,
  IsExistShopCart: false  // سبد خریدی وجود دارد یا نه
};


const getters = {
  GetUserShopCart(state) {
    return state.UserShopCart;
  },
  GetTotalPrice(state) {
    return state.TotalPrice;
  },
  IsExistShopCart(state) {
    return state.IsExistShopCart;
  }
};

const mutations = {
  SetUserShopCart(state, shopCart) {
    state.UserShopCart = shopCart;
    state.TotalPrice = 0;
    for (let i = 0; i < shopCart.order_details.length; i++) {
      state.TotalPrice += shopCart.order_details[i].price * shopCart.order_details[i].count;  // حساب کردن مبلغ نهایی
    }
  },
  SetExistShopCart(state, isExist) {
    state.IsExistShopCart = isExist;
  }
};

const actions = {
  AddProductToOrder(context, orderDetail) {
    Vue.http.get('Order/AddProductToOrder', {
      params: {
        productId: orderDetail.productId,
        count: orderDetail.count
      }
    }).then(response => {

      if (response.body.status == "NotFoundProduct") alert('محصولی با مشخصات وارد شده یافت نشد');
      if (response.body.status == "InvalidCount") alert('تعداد وارد شده صحیح نمیباشد');
      if (response.body.status == "Done") alert('محصول مورد نظر با موفقیت به سبد خرید اضافه شد');
    },response=>{
      if (response.status==401) alert('لطفا ابتدا وارد سایت شوید');
    }, function(error){    // error handle
      console.log(error);
    });
  },
  GetUserOpenOrder(context) {

    Vue.http.get('Order/GetShopCart').then(response => {
      return response.json();
    }).then(data => {
     
      if (data.status == "NotExist") {
        context.commit("SetExistShopCart", false);
      }
      if (data.status == "success") {
        context.commit("SetUserShopCart", data.result);
        if (data.result.order_details.length != 0) {
          context.commit("SetExistShopCart", true);
        } else {
          context.commit("SetExistShopCart", false);
        }
      }
    }, response => {  // برای خطا
      if (response.status==401) alert('لطفا ابتدا وارد سایت شوید');
    }, function(error){    // error handle
      console.log(error);
    });


  },
  DeleteOrderDetail(context, detailId) {
    Vue.http.get('Order/DeleteDetail', {
      params: {
        detailId: detailId
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      if (data.status == "NotExist") alert('اطلاعات مورد نظر یافت نشد');
      if (data.status == "success") {
        context.commit("SetUserShopCart", data.result);
        if (data.result.order_details.length != 0) {
          context.commit("SetExistShopCart", true);
        } else {
          context.commit("SetExistShopCart", false);
        }
      }
    }, response => {  // برای خطا
      if (response.status==401) alert('لطفا ابتدا وارد سایت شوید');
    }, function(error){    // error handle
      console.log(error);
    });
  },
  CompleteShopping(context) {
    Vue.http.get("Order/CompleteShop").then(response => {

      if (response.body.status == "NotExist") alert('اطلاعات مورد نظر یافت نشد');
      if (response.body.status == "EmptyShopCart") alert('سبد خرید شما خالی می باشد');
      if (response.body.status == "success"){
        context.commit("SetExistShopCart", false);
        alert('خرید شما با موفقیت انجام شد');
      }
    }, response => {  // برای خطا
      if (response.status==401) alert('لطفا ابتدا وارد سایت شوید');
    }, function(error){    // error handle
      console.log(error);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
