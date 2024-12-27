import React from 'react'
import ProductCard from '../home/product-card'

const AllProducts = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 px-3 md:px-10 gap-3'>
    {Array(10).fill(0).map((_, i) => (
        <ProductCard key={i}/>
    ))}
    </div>
  )
}

export default AllProducts