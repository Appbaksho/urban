import React from 'react'
import ProductCard from '../home/product-card'

const SearchResultProducts = () => {
  return (
    <div className='mt-10 grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-3'>
        {Array.from({length: 8}).map((_,i)=>(
            <ProductCard key={i}/>
        ))}
    </div>
  )
}

export default SearchResultProducts