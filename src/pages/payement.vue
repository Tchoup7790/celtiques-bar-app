<template>
  <div class="container">
    <h1>Paiement</h1>

    <div style="margin-bottom: 10px">
      <strong>Total du panier : </strong>{{ (totalCents / 100).toFixed(2) }} €
    </div>

    <div class="payements-grid">
      <div class="payements-grid-inner">
        <div
          class="btn-secondary"
          v-for="denom in denominations"
          :key="denom.label"
          style="text-align: center; border-radius: 12px; width: 150px"
        >
          <div style="font-weight: bold; margin-bottom: 0.3rem">{{ denom.label }}</div>
          <button
            class="btn-primary"
            style="margin-right: 0.5rem"
            @click="removeDenomination(denom.label)"
            :disabled="receivedQuantities[denom.label] === 0"
          >
            -
          </button>

          <button @click="addDenomination(denom.label)" class="btn-primary">+</button>

          <div style="margin-top: 0.3rem">x {{ receivedQuantities[denom.label] }}</div>
        </div>
      </div>
    </div>

    <div style="margin-top: 0.5rem">
      <strong>Total reçu : </strong>{{ (totalReceived / 100).toFixed(2) }} €
    </div>

    <div style="margin-top: 0.5rem">
      <strong>Monnaie à rendre : </strong>
      <span v-if="changeCents >= 0">{{ (changeCents / 100).toFixed(2) }} €</span>
      <span v-else style="color: red">
        Paiement insuffisant (il manque {{ (-changeCents / 100).toFixed(2) }} €)
      </span>
    </div>
    <button
      class="btn-primary"
      style="margin-top: 1rem; width: 100%"
      @click="
        () => {
          cartStore.clearCart()
          router.push('/')
        }
      "
    >
      Vider le panier
    </button>

    <router-link to="/cart" style="display: block; margin-top: 1rem; text-align: center">
      Retour au panier
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cartStore'
import { router } from '../router'

const cartStore = useCartStore()
const totalCents = computed(() => Math.round(cartStore.total * 100))

// Coupures en centimes avec labels
const denominations = [
  { value: 5000, label: '50 €' },
  { value: 2000, label: '20 €' },
  { value: 1000, label: '10 €' },
  { value: 500, label: '5 €' },
  { value: 200, label: '2 €' },
  { value: 100, label: '1 €' },
  { value: 50, label: '0.50 €' },
  { value: 20, label: '0.20 €' },
  { value: 10, label: '0.10 €' },
  { value: 5, label: '0.05 €' },
  { value: 2, label: '0.02 €' },
  { value: 1, label: '0.01 €' },
]

// Quantités reçues (paiement) par coupure
const receivedQuantities = ref<Record<string, number>>(
  denominations.reduce(
    (acc, d) => {
      acc[d.label] = 0
      return acc
    },
    {} as Record<string, number>,
  ),
)

// Total reçu en centimes
const totalReceived = computed(() => {
  return denominations.reduce((sum, d) => {
    return sum + (receivedQuantities.value[d.label] || 0) * d.value
  }, 0)
})

// Monnaie à rendre (peut être négative si reçu < total)
const changeCents = computed(() => totalReceived.value - totalCents.value)

// Fonctions pour ajouter/enlever des coupures
function addDenomination(label: string) {
  receivedQuantities.value[label]++
}
function removeDenomination(label: string) {
  if (receivedQuantities.value[label] > 0) {
    receivedQuantities.value[label]--
  }
}
</script>
