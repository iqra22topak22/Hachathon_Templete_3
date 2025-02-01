import ProductListing from '@/app/productlisting/page';
import { client } from '@/sanity/lib/client';
import { sanityFetch } from '@/sanity/lib/fetch';
import { product } from '@/sanity/schemaTypes/product';
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';


interface props{
    params: Promise<{
        slug: string;
    }>

}

export default async function page ({params}:props) {
    const {slug} = await params;
//     const product =await sanityFetch({query:`*[_type == "product" && slug.current == $slug]{name, price, slug, image, description}
        
// `},{ slug })

const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      name, 
      price, 
      slug, 
      image, 
      description
    }`,
    { slug }
  );

  

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">No Product Found</h1>
        <p className="text-center text-gray-600 text-sm sm:text-base">
          We're sorry, but the product you're looking for isn't available right now. Please check back later or explore other products.
        </p>
        <Link 
          href={"/"}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm sm:text-base"
        >
          Browse Products
        </Link>
      </div>
    );
  }
console.log("Product Details ======= >>>>>",product);
  return(

<div className="max-w-xs w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
  {/* Image Container */}
  <div className="relative p-4">
    {product.image && (
      <Image
        src={urlFor(product.image).url()}
        alt={product.name}
        width={200}
        height={200}
        className="w-full h-auto rounded-lg object-cover"
      />
    )}
  </div>

  {/* Product Details */}
  <div className="p-4">
    <h1 className="text-xl font-semibold text-gray-900 truncate">{product.name}</h1>
    <p className="text-lg text-gray-700 mt-2">{product.price}</p>
  </div>
</div>


  )
}



