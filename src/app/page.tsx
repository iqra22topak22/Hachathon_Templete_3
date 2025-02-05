"use client"
// import Hero from "./components/hero";
// import Brand from "./components/brand";
// import Ceramics from "./components/ceramics";
// import Product from "./components/product";
// import Benefit from "./components/benefit";
// import Touch from "./components/touch";



// export default function Home() {
//   return (
//    <>
//    <Hero />
//    <Brand />
//    <Ceramics />
//    <Product />
//    <Benefit />
//    <Touch />
//    </>
//   );
// }
// ******************************************************************

import { sanityFetch } from "@/sanity/lib/fetch";
import { allProducts } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/addToCartButton";



// export type Product = {
//   _id : string,
//   product :string,
//   category :string,
//   name : string,
//   slug : {
//     current:string;
//     _type:string;
//   },
//   imageUrl : string,
//   price :number,
//   quantity :number,
//   tags : string,
//   description :string,
//   features :string,
//   dimensions : string,
// }
export type Product = {
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


// type category= {
//   category : string,
//   name : string,
//   slug : string,
// }

export default async function Home(){
  const products : Product[] =await sanityFetch({query :allProducts})

  // console.log("Products Coming from sanity",products);
  // *************************cart************************

  return(
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  {products.map((product) => (
    <div
      key={product.slug.current}
      className="bg-white shadow-lg rounded-lg overflow-hidden"
    >

      <Link href={`/products/${product.slug.current}`}>
      {/* Product Image */}
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-60 object-cover"
        height={500}
        width={400}
      />
      </Link>
      <div className="p-4">
        {/* Product Title */}
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>

        {/* Product Description */}
        <p className="text-gray-600 mt-2">{product.description}</p>

        {/* Product Price */}
        <p className="mt-4 text-lg font-semibold text-gray-900">{product.price}</p>

        {/* Optional: Add a button for actions like "Add to Cart" */}
       
        <AddToCartButton product={product} />
      </div>
    </div>
  ))}
</div>

      </div>
     
  )
}
