import Cart from '../pages/cart.vue'
import Products from '../pages/products.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Products', component: Products },
  { path: '/cart', name: 'Cart', component: Cart }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
