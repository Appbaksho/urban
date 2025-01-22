"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'
import { BatchOrder } from '../api/orders.model'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ProductsInfoProps {
    products:BatchOrder[]
    deliveryCharge:number
}

const ProductsInfo = (props:ProductsInfoProps) => {
    useEffect(() => {
      if(props){
        console.log('BATCH',props)
      }
    }, [props])
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ordered Items</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] flex flex-col gap-2">
          {props.products.map((item, index) => (
            <Card className='mt-3'>
                <div key={index} className='p-2'>
                    <div className="flex items-center justify-between">
                    <div className='flex gap-2'>
                        <img src={item.orderDetail.imageUrl} className='h-[70px] w-[70px] rounded-md object-cover'/>
                        <div>
                        <p className="text-sm font-semibold">{item.orderDetail.productName}</p>
                        <div className='flex my-1'>
                        <p className="text-xs mt-1 bg-primary/10 rounded-md p-1">Size: {item.orderDetail.size}</p>
                        </div>
                        <p className="text-xs text-primary/70">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="text-sm font-semibold">{item.orderDetail.price} BDT</p>
                    </div>
                </div>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className='flex flex-col gap-2'>
        <div className="flex w-full items-center justify-between text-sm">
            <p>Delivery Charge: </p>
            <p className='font-semibold'>{props.deliveryCharge} BDT</p>
        </div>
        <div className="flex w-full items-center justify-between text-sm mt-1 bg-primary/10 p-3 rounded-md">
            <p>Total: </p>
            <p className='font-semibold'>{
                props.products.reduce((acc, item) => {
                    return acc + (item.orderDetail.price*item.quantity)
                }, 0) + props.deliveryCharge} BDT</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductsInfo