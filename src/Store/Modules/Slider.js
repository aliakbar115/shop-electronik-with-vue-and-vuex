import Vue from 'vue';

const state = {
  sliders:[],   //آرایه ای از اسلایدرهایی که از سمت سرور می آید
  SliderImageAddress: "http://localhost:8000/"   // یک آدرس اولیه ثابت برای گرفتن عکس ها
};


const getters = {
  getSliders(state){
    return state.sliders;
  },
  getSliderImageAddress(state){
    return state.SliderImageAddress
  }
};

const mutations = {
  setSliders(state,sliders){
    state.sliders=sliders;
  }
};

const actions = {
  GetSlidersFromServer(context){
    Vue.http.get("slider/GetSliders")  //  شد import به همین جهت ویو بالا
      .then(response => {
        return response.json();
      }).then(data => {
        context.commit("setSliders", data);
      });

  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
