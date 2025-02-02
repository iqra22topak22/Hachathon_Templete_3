"use client"

import { type Product, useCartStore } from "@/store/cartStore"
import { useEffect, useState } from "react"

function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, items } = useCartStore()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      console.log("Items", items)
    }
  }, [isHydrated, items])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    console.log("Product added to cart:", product)
  }

  if (!isHydrated) {
    return null // or a loading indicator
  }

  return (
    <button
      className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:scale-110 transition-transform duration-200 ease-in-out hover:bg-blue-700"
      onClick={() => handleAddToCart(product)}
    >
      Add to Cart
    </button>
  )
}

export default AddToCartButton



// 1 mint ok kry
//  dekhi abhi jaise me kuch likh rha ho is file me jiska name addToCartButton.tsx ha tu ab is kuch change hoa ha to vs code ne detect kar leya ha or ab wo keh rha ha isko push kar do abhi mene commit keya ha khali  