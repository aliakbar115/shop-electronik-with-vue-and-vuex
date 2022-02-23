import Vue from 'vue';
import {router} from '../../main';

const state = {
  UserFullName: '', // برای پیغام خوش آمد گویی
  IsUserAuthenticated: false
};


const getters = {
  GetUserFullName(state) {
    return state.UserFullName;
  },
  IsUserAuthenticated(state) {
    return state.IsUserAuthenticated;
  }
};

const mutations = {
  SetAuthCookie(state, loginResult) {
    Vue.cookie.set(   // use from vue-cookie
      "Eshop_Auth_Token",  // نام کوکی
      loginResult.body.user.api_token,   // مقدار کوکی
      1    // مدت روز
    );
  },
  SetUserFullName(state, userFullName) {
    state.UserFullName = userFullName;
  },
  SetUserAuthenticated(state, isAuth) {
    state.IsUserAuthenticated = isAuth;
  },
  DeleteAuthCookie() {
    Vue.cookie.delete("Eshop_Auth_Token");
  }
};

const actions = {
  RegisterUser(context, registerData) {
    Vue.http.post('Account/Register', registerData)
      .then(response => {
        //console.log(response);
        if (response.status == 201) {
          //console.log(response);
          alert("ثبت نام با موفقیت انجام شد");
        }
        //console.log(response);
      }, data => {
        //console.log(data);
      });
  },
  LoginUser(context, loginData) {
    Vue.http.post('Account/Login', loginData).then(response => {
      //console.log(response);
      if (response.body.result == "NotFound") {
        alert('کاربری با مشخصات وارد شده یافت نشد');
      }

      if (response.body.result == "Done") {
        //console.log(response.body.user.api_token);
        context.commit("SetAuthCookie", response); // یک کوکی ست می کنیم
        context.commit("SetUserFullName", response.body.user.name + " " + response.body.user.family);
        context.commit("SetUserAuthenticated", true);
        router.push('/');   // ری دایرکت
      }

    });
  },
  CheckForLogin(context) {
    Vue.http.get('Account/CheckAuthentication').then(response => {

      if (response.status !== 401 && response.body.status) {
        context.commit("SetUserFullName", response.body.user.name + " " + response.body.user.family);
        context.commit("SetUserAuthenticated", true);
      }
    }, response => {  // برای خطا
      if(response.status == 401) {
        //console.log(response.body.data.message);
      }

    }, function(error){    // error handle
      //console.log(error);
    });

  },

  SignOutUser(context) {
    Vue.http.get('Account/SignOut').then(response => {

      if (response.status !== 401 && response.body.status == "success") {
        context.commit("SetUserFullName", '');
        context.commit("SetUserAuthenticated", false);
        context.commit("DeleteAuthCookie");
        router.push('/Login');
      }
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
