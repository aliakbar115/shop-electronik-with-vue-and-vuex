<template>
  <section>
    <app-slider></app-slider>
    <most-sell></most-sell>
    <latest-products></latest-products>
  </section>
</template>

<script>
import Slider from "./Components/Slider";
import MostSellProducts from "./Components/MostSellProducts";
import LatestProducts from './Components/LatestProducts'

export default {
  data() {
    return {};
  },
  components: {
    "app-slider": Slider,
    mostSell:MostSellProducts,
    latestProducts: LatestProducts
  }
};
</script>
