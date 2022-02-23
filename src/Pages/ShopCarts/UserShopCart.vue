<template>
  <div class="container" v-if="IsExistUserShopCart">
    <section id="cart_items">
      <div class="container">
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">کـالا</td>
                <td class="description"></td>
                <td class="price">قیمت واحد</td>
                <td class="quantity">تعـداد</td>
                <td class="total">مجمـوع</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in UserShopCart.order_details" :key="index">
                <td class="cart_product">
                  <router-link :to="{ name: 'SingleProduct', params: { id: cart.product.id } }">
                    <img :src="ProductImageAddress + cart.product.productImageName" width="60" height="60" alt="product Image Name" />
                  </router-link>
                </td>

                <td class="cart_description">
                  <h4 style="padding-right: 20px;">
                    <router-link style="font-size: 13pt;" :to="{ name: 'SingleProduct', params: { id: cart.product.id } }">
                      {{ cart.product.productName }}
                    </router-link>
                  </h4>
                  <p style="padding-right: 20px;">شناسـه : {{ cart.product.id }}</p>
                </td>

                <td class="cart_price">
                  <p>{{ cart.product.price }} تومان</p>
                </td>
                <td class="cart_quantity">
                  <div class="cart_quantity_button">
                    <p>{{ cart.count }}</p>
                  </div>
                </td>

                <td class="cart_total">
                  <p class="cart_total_price">{{ cart.product.price * cart.count }}</p>
                </td>


                <td class="cart_delete">
                  <a class="cart_quantity_delete cursor-pointer" @click="DeleteOrderDetail(cart.id)">
                    <i class="fa fa-times"></i>
                  </a>
                </td>

						  </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!--/#cart_items-->

    <section id="do_action">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="total_area">
              <ul>
                <li>
                  مجمـوع <span>{{ TotalPrice }} تومان</span>
                </li>
              </ul>
              <a class="btn btn-default check_out cursor-pointer" @click="CompleteUserShopping()">پرداخت</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--/#do_action-->
  </div>
  <!--اگر سبد خالی بود-->
  <div class="container min-height-350" v-else>
    <div class="alert alert-warning">
      سبد خرید شما خالی میباشد
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    GetUserOpenShopCart() {
      this.$store.dispatch("GetUserOpenOrder");
    },
    DeleteOrderDetail(detailId) {
      this.$store.dispatch("DeleteOrderDetail", detailId);
    },
    CompleteUserShopping() {
      this.$store.dispatch("CompleteShopping");
    }
  },
  created() {
    this.GetUserOpenShopCart();
  },
  computed: {
    UserShopCart() {
      return this.$store.getters.GetUserShopCart;
    },
    IsExistUserShopCart() {
      return this.$store.getters.IsExistShopCart;
    },
    TotalPrice() {
      return this.$store.getters.GetTotalPrice;
    },
    ProductImageAddress() {
      return this.$store.getters.GetProductImageAddress;
    }
  }
};
</script>
