<template>
  <div class="container">
  <!--  @input="$v"      دسترسی داریم validations با این دستور به همه پراپرتی های موجود در -->
   <!--<p>{{$v}}</p>-->
    <section id="form">
      <!--form-->
      <div class="row">
        <div class="col-sm-4 col-sm-offset-1">
          <div class="signup-form">
            <!--sign up form-->
            <h2>ثبت نام کاربـر جدیـد</h2>
            <form action="#">
              <input type="text" placeholder="نام کاربـر" v-model="name" @input="$v.name.$touch()" :class="{invalid:$v.name.$error}"/>
              <p class="text-danger" v-if="!$v.name.required && $v.name.$dirty" >
                لطفا نام کاربـر را وارد کنید
              </p>

              <input type="text" placeholder="نام خانوادگی" v-model="family" @input="$v.family.$touch()" :class="{invalid:$v.family.$error}" />
              <p class="text-danger" v-if="!$v.family.required && $v.family.$dirty" >
                لطفا نام خانوادگی را وارد کنید
              </p>

              <input type="text" placeholder="آدرس ایمیـل" v-model="email" @blur="$v.email.$touch()" :class="{invalid:$v.email.$error}" />
              <p class="text-danger" v-if="!$v.email.email">ایمیل وارد شده معتبر نمیباشد</p>
              <p class="text-danger" v-if="!$v.email.unique && $v.email.$dirty">ایمیل وارد شده تکراری میباشد</p>
              <p class="text-danger" v-if="!$v.email.required && $v.email.$dirty">لطفا ایمیل را وارد کنید</p>
              <p class="text-danger" v-if="!$v.email.maxLength">
                ایمیل کاربر نمیتواند بیشتر از {{$v.email.$params.maxLength.max}} کاراکتر داشته باشد
              </p>

              <!--@blur="$v.password.$touch()"    زمانی که از اینپوت خارج شدی بررسی شود-->
              <input type="password" placeholder="رمـز عبـور" v-model="password" @blur="$v.password.$touch()" :class="{invalid:$v.password.$error}">
              <p class="text-danger" v-if="!$v.password.required && $v.password.$dirty" >
                لطفا کلمه عبور را وارد کنید
              </p>
              <p class="text-danger" v-if="!$v.password.minLength">
              کلمه عبور باید حداقل شمال {{$v.password.$params.minLength.min}} کاراکتر باشد
              </p>

              <input type="password" placeholder="تکرار رمز عبـور" v-model="rePassword" @input="$v.rePassword.$touch()" :class="{invalid:$v.rePassword.$error}">
              <p class="text-danger" v-if="!$v.rePassword.sameAs && $v.rePassword.$dirty">کلمه عبور مغایرت دارد</p>


              <textarea rows="5" id="Address"  placeholder="آدرس " v-model="address" @input="$v.address.$touch()" :class="{invalid:$v.address.$error}"></textarea>
              <p class="text-danger" v-if="!$v.address.required && $v.address.$dirty" >
                لطفا آدرس را وارد کنید
              </p>

              <br><br>
              <!--:disabled="$v.$invalid"    تا اطلاعات درست نباشد دکمه غیر فعال است -->
              <a @click.prevent="RegisterUser()" class="btn btn-success btn-block" :disabled="$v.$invalid">ثبت نام</a>


            </form>
          </div>
          <!--/sign up form-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {  // باید ولیدیشن های استفاده شده را اضافه کنیم
  required,
  maxLength,
  email,
  minLength,
  sameAs
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      name: "",  //  بود vuelidate دلیل اینکه موارد را در یک آبجکت نزاشتیم استفاده از پلاگین
      family: "",
      email: "",
      password: "",
      rePassword: "",
      address: ""
    };
  },
   methods: {
    RegisterUser() {
      const register = {  // باید یک آبجکت از موارد ثبت نامی بسازیم و به سمت سرور بفرستیم
        name: this.name,
        family: this.family,
        email: this.email,
        password: this.password,
        address: this.address
      };
      this.$store.dispatch("RegisterUser", register); // به سمت سرور بفرستیم
    }
  },
  validations: {  //  این پراپرتی اضافه می شود vuelidate بعد از نصب
    name:{
      required,
      minLength: minLength(2),
    },
    family:{
      required,
      minLength: minLength(3),
    },
    address:{
      required,
    },
    email: {
      required,
      email,
      maxLength: maxLength(100),
      // custom validator   تعریف
      unique: function(val) {
        if (val === "") return true;  // چون فقط یونیک بودن بررسی می شود به این فانکشن ربطی ندارد

        return this.$http
          .get("Account/IsExistUserByEmail", {
            params: { email: val }
          })
          .then(
            response => {
              return !response.body.isExist;
            },
            error => {
              //console.log(error);
            }
          );
      }
    },
    password: {
      minLength: minLength(6),
      required
    },
    rePassword: {
      sameAs: sameAs("password")
    }
  }





};
</script>

<style scoped>
.invalid {
  border: 1px solid red !important;
  box-shadow: 0 0 5px red !important;
  background-color: lightpink !important;
}
</style>
