import Vue from 'vue';

const state = {

};


const getters = {

};

const mutations = {

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

};

export default {
  state,
  getters,
  mutations,
  actions
};
