//  "use client"

// import { allProducts } from '@/sanity/lib/queries';
// import { getCartItems, removeFromCart, updateCartQuantity } from '../actions/actions';
// import { getItemKey } from 'sanity';
// import { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// const cartPage= () => {

//     const [cartItems, setCartItems] = useState< typeof allProducts[]>([]);
//        useEffect(() => {
//         setCartItems(getCartItems())

//        },[]) ;

//        const handleRemove =(id : string)=>{
//         Swal.fire({
//             title: "Are you sure>",
//             text: "you will not be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonAriaLabel: "#d33",
//             confirmButtonText: "yes, remove it!",

//         }).then((result) => {
//             if(result.isConfirmed){
//             removeFromCart(id)
//             setCartItems(getCartItems())
//             Swal.fire("Removeed!", "item has been removed", "success")
//             }
//         })
//        }

//        const handleQuantityChange = (id : string ,quantity :number)=>{
//         updateCartQuantity(id,quantity);
//         setCartItems{getCartItems()}

//        }
//        const handleIncrement = (id : string ) =>{
//         const product = cartItems.find((item)=> item._id === id)
//         if(product )
//         handleQuantityChange(id,product.quantity + 1)
    
//        }
//        const handleDecrement = (id : string ) =>{
//         const product = cartItems.find((item)=> item._id === id)
//         if(product && product.quantity >0)
//         handleQuantityChange(id,product.quantity - 1)
    
//        }

//        const calclatedTotal = () =>{
//         return cartItems.reduce((total ,item)=> total + item.price * item.quantity,0)
//        }
    
//       const  handleProcessd =()=>{
//         Swal.fire({
//             title: "Proceed to checkout?",
//             text: "Pleasr review your cart before checkout!",
//             icon: "question",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonAriaLabel: "#d33",
//             confirmButtonText: "yes, proceeed!",
//         }).then((result) =>{
//             if(result.isConfirmed){
//                 Swal.fire("success!", "your order hsn been successfully porcessed", "success")
//                 setCartItems([])
//             }
//         })
//       }
//   return (
//     <div>
     
//     </div>
//   )
// }

// export default cartPage;

"use client"

import { useCartStore } from "@/store/cartStore"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCartStore()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  console.log("Items", items)

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id)
        Swal.fire("Removed!", "Item has been removed.", "success")
      }
    })
  }

  const handleIncrement = (id: string) => {
    const item = items.find((item) => item._id === id)
    if (item) updateQuantity(id, item.cartQuantity + 1)
  }

  const handleDecrement = (id: string) => {
    const item = items.find((item) => item._id === id)
    if (item && item.cartQuantity > 1) updateQuantity(id, item.cartQuantity - 1)
  }

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to checkout?",
      text: "Please review your cart before checkout!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Your order has been successfully processed", "success")
        clearCart()
      }
    })
  }

  if (!isHydrated) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item._id} className="border p-4 rounded-lg shadow-lg">
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-2">Price: ${item.price}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleDecrement(item._id)}
                    >
                      -
                    </button>
                    <span>{item.cartQuantity}</span>
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleIncrement(item._id)}
                    >
                      +
                    </button>
                  </div>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleRemove(item._id)}>
                    Remove
                  </button>
                </div>
                <p className="text-lg font-semibold">Total: ${item.price * item.cartQuantity}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-8">
            <div className="text-xl font-bold">Total: ${getTotal()}</div>
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg" onClick={handleProceed}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage









