<template>
  <div>
    <app-header></app-header>

    <transition appear enter-active-class="animated fadeInRightBig">  <!--appear  for load -->
      <router-view></router-view>  <!--use from vue-router -->
    </transition>


    <app-footer></app-footer>

  </div>

</template>

<script>
import Footer from './Pages/Shared/Footer';
import Header from './Pages/Shared/Header';
export default {
  name: 'app',
  data () {
    return {

    }
  },
  components:{
    appFooter:Footer,
    appHeader:Header
  }
}
</script>

<style>

</style>

