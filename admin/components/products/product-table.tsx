"use client"
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import ProductTableAdapter from './product-table-adapter'
import { useGetProductsQuery } from './api/products.api'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '../ui/skeleton'

const ProductTable = ({query}:{query:string}) => {
  const {data,isLoading,isSuccess,isError,error} = useGetProductsQuery()
  const {toast} = useToast()
  

  useEffect(() => {
    if(isError){
      toast({
        title: 'Error',
        description: 'Cannot get products',
      })
      console.log(error)
    }
  }, [isSuccess,isError])

  


  return (
    <Table>
      <TableCaption>A list of your products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Discount Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading?Array(10).fill("_").map((_,i)=><TableRow>
          <TableCell colSpan={6}>
            <Skeleton className='w-full h-[50px]' key={i}/>
          </TableCell>
        </TableRow>):data?.filter(v=>v.name.toLowerCase().trim().includes(query.toLowerCase().trim())).map(product => (
          <ProductTableAdapter key={product.id} {...product}/>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProductTable