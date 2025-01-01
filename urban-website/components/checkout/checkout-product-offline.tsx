"use client"
import { AddToCartPayload, Item } from '@/api/cart/cart.model'
import { useGetSingleProductQuery } from '@/api/products/products.api'
import { useToast } from '@/hooks/use-toast'
import React, { useEffect } from 'react'

interface Props {
  products: AddToCartPayload[]
  settotal: React.Dispatch<React.SetStateAction<number>>
  quantity: number
  id: string
}

const CheckoutProductOffline = (props:Props) => {
  

  const {data:product,isError,isSuccess,isLoading,error} = useGetSingleProductQuery(String(props.id))
  const {toast} = useToast()
  useEffect(() => {
    if(isError){
      toast({
        title:'Error',
        description:'Cannot fetch product data',
        variant:'destructive'
      })
      console.log(error)
    }
    if(isSuccess){
      const prods = props.products.filter((v)=>v.productId==props.id)
      if(prods.length==1){
        props.settotal(p=> p+prods.reduce((acc,v)=>acc+v.quantity*product.price,0))
      }
    }
  }, [isError,isSuccess])


  return (
    <div className='flex items-center justify-between py-2'>
                  <div className='flex items-center space-x-2'>
                    <img src={product?.imageUrl[0]} alt="product" className='w-16 h-16 object-cover'/>
                    <div>
                      <p className='font-semibold'>{product?.name}</p>
                      <p className='text-xs'>Quantity: {props.quantity}</p>
                    </div>
                  </div>
                  <p className='font-semibold'>{product?.price} BDT</p>
                </div>
  )
}

export default CheckoutProductOffline