<template>
  <div class="container">
    <h1>Paiement</h1>

    <div style="margin-bottom: 10px">
      <strong>Total du panier : </strong>{{ (totalCents / 100).toFixed(2) }} €
    </div>

    <div style="margin-bottom: 1rem">
      <label for="paymentInput"><strong>Montant reçu (€) :</strong></label>
      <input
        v-model="amountReceivedEuros"
        type="text"
        inputmode="decimal"
        pattern="[0-9]+([.,][0-9]{0,2})?"
        placeholder="0,00"
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
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cartStore'
import { router } from '../router'

const cartStore = useCartStore()
const totalCents = computed(() => Math.round(cartStore.total * 100))

// Montant reçu en euros
const amountReceivedEuros = ref(0)

// Conversion en centimes pour le calcul
const totalReceived = computed(() => Math.round(amountReceivedEuros.value * 100))

// Monnaie à rendre
const changeCents = computed(() => totalReceived.value - totalCents.value)
</script>
