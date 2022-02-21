<template>
  <div class="col-md-12">
    <div class="recommended_items">
      <!--NewProduct_items-->
      <h2 class="title text-center">پر فروش ترین محصولات</h2>

      <div class="col-sm-3" v-for="product in MostSellProducts" :key="product.id">
        <div class="product-image-wrapper">
          <div class="single-products">
            <div class="productinfo text-center">
              <a href="/">
                <img :src="ProductImageAddress+product.productImageName" width="253" height="202">
              </a>
              <h2>{{ product.price }}</h2>
              <p>{{ product.productName.substring(0,30) }}</p>
              <a href="#" class="btn btn-default add-to-cart">
                <i class="fa fa-shopping-cart"></i>افزودن به سبـد خرید
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    MostSellProducts() {
      return this.$store.getters.GetMostSellProducts;
    },
    ProductImageAddress() {
      return this.$store.getters.GetProductImageAddress;
    }
  },
  created() {
    this.$store.dispatch("GetMostSellProductsFromServer");
  }
};
</script>
