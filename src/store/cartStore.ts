import { defineStore } from 'pinia'
import type { Product } from './productsStore'

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    total: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    getQuantityById: (state) => (id: string): number => {
      const item = state.items.find(i => i.id === id)
      return item ? item.quantity : 0
    },
  },

  actions: {
    addItem(product: Product) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeItem(id: string) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    updateQuantity(id: string, quantity: number) {
      const item = this.items.find((i) => i.id === id)
      if (item) {
        item.quantity = Math.max(quantity, 0)
        if (item.quantity === 0) this.removeItem(id)
      }
    },
    clearCart() {
      this.items = []
    }
  }
})

