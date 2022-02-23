<template>
  <div class="col-md-12">
    <div class="recommended_items">
      <!--NewProduct_items-->
      <h2 class="title text-center">پر فروش ترین محصولات</h2>

      <div class="col-sm-3" v-for="product in MostSellProducts" :key="product.id">
        <div class="product-image-wrapper">
          <div class="single-products">
            <div class="productinfo text-center">
              <router-link :to="{name:'SingleProduct',params:{id:product.id}}">
                <img :src="ProductImageAddress+product.productImageName" width="253" height="202">
              </router-link>
              <h2>{{ product.price }}</h2>
              <p>{{ product.productName.substring(0,30) }}</p>
              <a href="#" class="btn btn-default add-to-cart"  @click="AddProductToOrder(product.id)">
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
    if (this.MostSellProducts.length==0) { // 38m3
      this.$store.dispatch("GetMostSellProductsFromServer");
    }
  },
  methods: {
    AddProductToOrder(productId) {
      const orderDetail = {
        productId: productId,
        count: 1
      };

      this.$store.dispatch("AddProductToOrder", orderDetail);
    }
  }
};
</script>
