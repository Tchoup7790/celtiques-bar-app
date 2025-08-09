import Payement from '@/pages/payement.vue'
import Cart from '../pages/cart.vue'
import Products from '../pages/products.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Products', component: Products },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/payement', name: 'Payement', component: Payement }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
