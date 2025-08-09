import { defineStore } from 'pinia'

export interface Product {
  id: string
  name: string
  price: number
  emoji: string
}

export enum SpaceName {
  FOOD = 'Espace Nourriture',
  DRINK = 'Espace Bar'
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
      { id: '11', name: 'Pichet', price: 2, emoji: '💶' },
      { id: '12', name: 'Gobelet Rendu', price: -1, emoji: '🪙' },
      { id: '13', name: 'Pichet', price: -2, emoji: '💶' }
    ] as Product[],
    spaceName: SpaceName.DRINK as SpaceName
  }),
  actions: {
    populateWithDrink() {
      const drink = [
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
      ]
      this.products = [...this.products, ...drink]
    },
    populateWithFood() {
      const drink = [
        // 🥞 Crêpe
        { id: '1', name: 'Crêpe', price: 2, emoji: '🥞' },
        { id: '2', name: 'Café', price: 1, emoji: '☕️' },
        { id: '3', name: 'Galette', price: 4, emoji: '🫓' },
        // 🍗 Grillades
        { id: '4', name: 'Frites', price: 2.5, emoji: '🍟' },
        { id: '5', name: 'Sandwich Saucisses', price: 4, emoji: '🌭' },
        { id: '6', name: 'Frites Saucisse', price: 4, emoji: '🍟🌭' },
        { id: '7', name: 'Américain', price: 6, emoji: '🇺🇸' },
        { id: '8', name: 'Américain Breton', price: 6, emoji: '🇺🇸🌭' },
      ]
      this.products = [...this.products, ...drink]
    },
    clearProducts() {
      this.products = []
    },
    switchSpace() {
      this.clearProducts()
      if (this.spaceName === SpaceName.FOOD) {
        this.populateWithDrink()
        this.spaceName = SpaceName.DRINK
      } else {
        this.populateWithFood()
        this.spaceName = SpaceName.FOOD
      }
    }
  }
})
