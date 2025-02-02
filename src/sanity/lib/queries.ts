import { defineQuery } from "next-sanity";


export const allProducts = defineQuery(`
    
    *[_type == "product"]{
    _id,
    _product,
    category,
    name,
    slug,
    "imageUrl": image.asset->url,
     price,
     quantity,
     tags,
    description,
    features,
    dimensions,
    
    }
     `);
     

  export const fivePro = defineQuery(`
    
        *[_type == product "][0..4]{
        __product,
        category,
        name,
        slug,
        "imageUrl": image.asset->url,
         price,
         quantity,
         tags,
        description,
        features,
        dimensions
        }
        `)
        


