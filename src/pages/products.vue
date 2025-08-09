<script setup lang="ts">
import { useProductsStore, type Product } from '../store/productsStore'
import { useCartStore } from '../store/cartStore'
import CartFloating from '../components/cart-floating.vue'

const productsStore = useProductsStore()
const cartStore = useCartStore()

function addToCart(product: Product) {
  cartStore.addItem(product)
}
</script>

<template>
  <div class="container">
    <h1>Les Celtiques - BAR</h1>
    <div class="products-grid">
      <button
        v-for="product in productsStore.products"
        :key="product.id"
        @click="addToCart(product)"
        class="btn-primary"
        style="width: 100%; text-align: left; padding: 1rem"
      >
        <div class="product-name">
          <span>
            {{ product.name }}
          </span>
          <span>
            {{ product.emoji }}
          </span>
        </div>
        <div class="product-price">
          <span> {{ product.price }}€ </span>
          <span>{{ cartStore.getQuantityById(product.id) }} </span>
        </div>
      </button>
    </div>
    <CartFloating />
  </div>
</template>
