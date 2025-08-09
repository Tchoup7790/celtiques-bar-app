<template>
  <router-link to="/cart" class="floating-cart" aria-label="Voir le panier">
    <div class="count">{{ count }}</div>
    <div class="summary">
      <div class="label">Panier</div>
      <div class="total">{{ formattedTotal }}</div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../store/cartStore'

const cart = useCartStore()

// Nombre total d'articles
const count = computed(() => cart.items.reduce((sum, item) => sum + item.quantity, 0))

// Total formaté avec deux décimales
const formattedTotal = computed(() => `${cart.total.toFixed(2)} €`)
</script>
