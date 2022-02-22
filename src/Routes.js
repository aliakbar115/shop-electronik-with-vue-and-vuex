import Index from './Pages/Index/Index.vue'
import AboutUs from './Pages/AboutUs/About.vue'
import Products from './Pages/Products/Products.vue';
import SingleProduct from './Pages/SingleProducts/SingleProducts.vue'
import Login from './Pages/Account/Login.vue'
import Register from './Pages/Account/Register.vue'


export const Routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/AboutUs',
    component: AboutUs
  },
  {
    path:'/Products',
    component: Products,
    name:'GetProducts'
  },
  {
    path: '/Products/Single/:id',
    component: SingleProduct,
    name:'SingleProduct'
  },
  {
    path: '/Login',
    component: Login
  },
  {
    path: '/Register',
    component: Register
  }
];
