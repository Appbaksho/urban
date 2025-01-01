"use client"
import React, { useEffect } from 'react'
import ProductCard from '../home/product-card'
import { useGetProductsQuery } from '@/api/products/products.api'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '../ui/skeleton'

interface CategoryContainerProps {
  categoryId: string
}

const CategoryContainer = (props:CategoryContainerProps) => {
  const {data:products,isLoading,isError,error} = useGetProductsQuery()
  const {toast} = useToast()

  useEffect(() => {
    if(isError){
      toast({
        title:"Error",
        description:"Failed to load products",
        variant:"destructive"
      })
    }
  }, [isError,error])
  



  return (
    <div className='mt-10 px-5 md:px-10 grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-5'>
      {isLoading&&Array(15).fill(0).map((v, i) => (
        <Skeleton className='h-[300px] w-full rounded-md'/>
      ))}
      {
        products&&products?.filter((v)=>v.categoryId==props.categoryId).map((v, i) => (
          <ProductCard {...v} key={i}/>
        ))
      }
    </div>
  )
}

export default CategoryContainer