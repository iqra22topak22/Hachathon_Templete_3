'use client'
import { allProducts } from "@/sanity/lib/queries"

export const addToCart = (product: any)=>{
    const  cart : any= JSON.parse(localStorage.getItem("cart") || "[]");

    const exixtingProductIndex = cart.findIndex((item => item._id === product._id))

    if(exixtingProductIndex > -1){
        cart[exixtingProductIndex].quantity += 1
    }
    else{
        cart.push({...product, quantity: 1})
    }

    localStorage.setItem("cart" , JSON.stringify(cart))
}

export const removeFromCart = (product: string) =>{
    let cart : any = JSON.parse(localStorage.getItem("cart")|| "[]")

    cart = cart.filter((item => item._id !== productId))
    localStorage.setItem("cart" , JSON.stringify(cart))
}

export const updateCartQuantity = (productId : string , quantity :number)=> {
    const cart : any = JSON.parse(localStorage.getItem("cart") || "[]")
    const productIndex =cart.findIndex(item => item._id === productId)

    if(productIndex >-1){
        cart[productIndex].quantity = quantity
    }
}

export const getCartItems = ():product[] =>{
    return JSON.parse(localStorage.getItem("cart") || "[]")

}