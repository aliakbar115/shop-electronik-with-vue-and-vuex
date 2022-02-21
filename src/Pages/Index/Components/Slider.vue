<template>
  <div>
    <section id="slider"><!--slider-->
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div id="slider-carousel" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
                <li data-target="#slider-carousel" data-slide-to="1"></li>
              </ol>

              <div class="carousel-inner">

                <div class="item" v-for="(slider, index) in Sliders" :key="index" :class="{active:index==0}">
                  <div class="col-sm-6">
                    <h1><span>SHOP</span>CENTER</h1>
                    <h2>{{slider.title}}</h2>
                    <p>{{slider.description}} </p>
                    <button type="button" class="btn btn-default get">Get it now</button>
                  </div>
                  <div class="col-sm-6">
                    <img :src="SliderImageAddress+slider.imageName"  class="girl img-responsive " style="width:300px" alt="" />
                    <!-- <img src="src/assets/images/home/pricing.png"  class="pricing" alt="" /> -->
                  </div>
                </div>



              </div>

              <a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev">
                <i class="fa fa-angle-left"></i>
              </a>
              <a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
                <i class="fa fa-angle-right"></i>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section><!--/slider-->

  </div>
</template>
<script>
export default {

  computed:{
    Sliders(){
      return this.$store.getters.getSliders;
    },
    SliderImageAddress() {
      return this.$store.getters.getSliderImageAddress;
    }
  },
  created() {
    this.$store.dispatch("GetSlidersFromServer");  // dispatch   استفاده می شود action متدی است که برای فراخوانی فانکشن های موجود در
  },
};
</script>


