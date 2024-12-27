import React from 'react'
import ProductCard from '../home/product-card'

const CategoryContainer = () => {
  return (
    <div className='mt-10 px-5 md:px-10 grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-5'>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>  
        <ProductCard/>  
        <ProductCard/>  
        
    </div>
  )
}

export default CategoryContainer