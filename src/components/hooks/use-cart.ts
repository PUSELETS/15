import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

export type CartItem = {
  product: any
}

type CartState = {
  items: CartItem[]
  addItem: (product: any) => void
  removeItem: (productId: any) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          return { items: [...state.items, { product }] }
        }),
      removeItem: (product) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.$id !== product.$id
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)