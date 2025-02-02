import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface Product {
  _id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  description: string
  slug: { current: string; _type: string }
  dimensions: { depth: string; width: string; height: string }
  features: string[]
  tags: string[]
  category: { _ref: string; _type: string }
}

interface CartItem extends Product {
  cartQuantity: number
}

interface CartState {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item._id === product._id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === product._id ? { ...item, cartQuantity: (item.cartQuantity || 0) + 1 } : item,
              ),
            }
          }
          return { items: [...state.items, { ...product, cartQuantity: 1 }] }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item._id === productId ? { ...item, cartQuantity: quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * (item.cartQuantity || 0), 0)
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

