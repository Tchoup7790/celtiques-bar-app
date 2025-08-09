import { defineStore } from 'pinia'

export interface Product {
  id: string
  name: string
  price: number
  emoji: string
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      // 🍺 Alcool
      { id: '1', name: 'Bière', price: 3, emoji: '🍺' },
      { id: '2', name: 'Cidre', price: 3, emoji: '🍏' },
      { id: '3', name: 'Vin', price: 1.5, emoji: '🍷' },
      { id: '4', name: 'Godinette', price: 1.5, emoji: '🍓' },
      { id: '5', name: 'Pinte', price: 5, emoji: '🍻' },
      { id: '6', name: 'Pichet', price: 10, emoji: '🍶' },

      // 🥤 Sans alcool
      { id: '7', name: 'Soft', price: 2, emoji: '🥤' },
      { id: '8', name: 'Eau', price: 1, emoji: '💧' },

      // 🥜 Snacks
      { id: '9', name: 'Cacahuètes', price: 0.5, emoji: '🥜' },

      // 🪙 Consigne
      { id: '10', name: 'Gobelet', price: 1, emoji: '🪙' },
      { id: '11', name: 'Pichet', price: 2, emoji: '💶' }

    ] as Product[]
  })
})
