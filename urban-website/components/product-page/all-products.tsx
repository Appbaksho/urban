"use client"
import React from 'react'
import ProductCard from '../home/product-card'
import { useGetProductsQuery } from '@/api/products/products.api'

const AllProducts = () => {
  const {data,isLoading,isSuccess,isError,error} = useGetProductsQuery()  
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 px-3 md:px-10 gap-3'>
    {data?.map((v, i) => (
        <ProductCard {...v} key={i}/>
    ))}
    </div>
  )
}

export default AllProducts