<template>
  <div class="container">
    <h1>Paiement</h1>

    <div style="margin-bottom: 10px">
      <strong>Total du panier : </strong>{{ (totalCents / 100).toFixed(2) }} €
    </div>

    <div style="margin-bottom: 1rem; display: inline-flex">
      <label for="paymentInput"><strong>Montant reçu (€) :</strong></label>
      <input
        id="paymentInput"
        type="text"
        inputmode="decimal"
        pattern="[0-9]+([.,][0-9]{0,2})?"
        placeholder="0,00"
        v-model="inputValue"
      />
    </div>

    <div style="margin-top: 0.5rem">
      <strong>Total reçu : </strong>{{ amountReceivedEuros.toFixed(2) }} €
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
import { ref, computed, watch } from 'vue'
import { useCartStore } from '../store/cartStore'
import { router } from '../router'

const cartStore = useCartStore()
const totalCents = computed(() => Math.round(cartStore.total * 100))

// Valeur tapée par l'utilisateur (string)
const inputValue = ref('')

// Montant reçu en euros (number)
const amountReceivedEuros = ref(0)

// Met à jour amountReceivedEuros à chaque frappe
watch(inputValue, (val) => {
  const numeric = parseFloat(val.replace(',', '.'))
  amountReceivedEuros.value = isNaN(numeric) ? 0 : numeric
})

// Conversion en centimes
const totalReceived = computed(() => Math.round(amountReceivedEuros.value * 100))

// Monnaie à rendre
const changeCents = computed(() => totalReceived.value - totalCents.value)
</script>
