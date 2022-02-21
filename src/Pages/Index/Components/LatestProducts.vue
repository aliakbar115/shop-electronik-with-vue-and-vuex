<template>
  <div class="col-sm-12 padding-right">
    <div class="features_items">
      <!--RetailSale_items-->
      <a>
        <h2 class="title text-center">جدیدترین محصولات</h2>
      </a>

      <div class="col-sm-3" v-for="product in LatestProducts" :key="product.id">
        <div class="product-image-wrapper">
          <div class="single-products">
            <div class="productinfo text-center">
              <a href="/">
                <img :src="ProductImageAddress+product.productImageName" width="253" height="202">
              </a>
              <h2>{{ product.price }}</h2>
              <p>{{ product.productName.substring(0,30) }}</p>
            </div>
          </div>
          <div class="choose">
            <ul class="nav nav-pills nav-justified">
              <li>
                <a href="#">
                  <i class="fa fa-eye"></i>مشاهده
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-shopping-cart"></i>افزودن به سبد
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    LatestProducts() {
      return this.$store.getters.GetLatestProducts;
    },
    ProductImageAddress() {
      return this.$store.getters.GetProductImageAddress;
    }
  },
  created() {
    if (this.LatestProducts.length==0) { //38m3
      this.$store.dispatch("GetLatestProductsFromServer");
    }
  }
};
</script>
