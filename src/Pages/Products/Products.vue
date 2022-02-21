<template>
  <div class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12 padding-right">
          <div class="features_items">
            <div
              class="col-sm-3"
              v-for="product in FilterProducts.data"
              :key="product.id"
            >
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <a href="/">
                      <img :src="ProductImageAddress + product.productImageName" width="253" height="202"
                      />
                    </a>
                    <h2>{{ product.price }}</h2>
                    <p>{{ product.productName.substring(0, 30) }}</p>
                  </div>
                </div>
                <div class="choose">
                  <ul class="nav nav-pills nav-justified">
                    <li>
                      <a href="#"> <i class="fa fa-eye"></i>مشاهده </a>
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

            <div class="clearfix"></div>
            <!-- قسمت صفحه بندی -->
            <ul class="pagination">
              <!-- :class="[ n == FilterProducts.current_page ? 'active' : '' ]"   به این شکل هم می شود-->
              <li v-for="n in FilterProducts.last_page" :key="n" :class="{active : n == FilterProducts.current_page}" >
                <router-link :to="{name:'GetProducts',query:{page:n}}">{{ n }}</router-link>
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
    FilterProducts() {
      return this.$store.getters.GetProducts;
    },
    ProductImageAddress() {
      return this.$store.getters.GetProductImageAddress;
    }
  },
  watch: {
    $route(){
      this.$store.dispatch("GetProductsFromServer",{
        page:this.$route.query.page
      });
    }
  },
  created() {
    this.$store.dispatch("GetProductsFromServer",{
      page:1
    });
  }
};
</script>

<style scoped></style>
