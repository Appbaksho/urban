"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Loader2, X } from 'lucide-react'
import { Item, Size } from '@/components/api/cart/cart.model'
import { Badge } from '../ui/badge'
import { useRemoveFromCartMutation } from '@/components/api/cart/cart.api'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

const CartProduct = (props:Item) => {
  const [removeOpen, setremoveOpen] = useState<boolean>(false)
  const [removeFromCart,{data,error,isLoading,isSuccess,isError}] = useRemoveFromCartMutation()

  useEffect(() => {
    if(isError){
      console.log(error)
    }
    if(isSuccess){
      if(props.refetch){
        props.refetch()
      }
      console.log(data)
      setremoveOpen(false)
    }
  }
  , [isError,isSuccess])

  return (
    <div className='flex gap-2 w-full justify-between'>
        <img width={100} height={100} src={props.size.product.imageUrl[0]} alt="Cart Item Image" className="object-cover h-[70px] w-[70px] rounded-md" />
        <div className='w-full flex flex-col items-start'>
            <p className="font-semibold text-left text-primary">{props.size.product.name}</p>
            <div className="flex items-center mt-1">
            <p className="text-xs mr-2">Size</p> <Badge variant="outline" className='text-xs'>{props.size.name}</Badge>
            <p className="text-xs ml-2 text-right">Qty : {props.quantity}</p>
            </div>
            
            <p className="text-sm font-semibold mt-2 text-primary">{props.size.product.discountPrice?Number(props.size.product.discountPrice)*Number(props.quantity):Number(props.size.product.price)*Number(props.quantity)} BDT</p>
        </div>
        <div className='flex justify-end'>
            <Button size="icon" className='h-[20px] w-[20px] bg-red-200 hover:bg-red-200/70 text-red-500' onClick={e=> setremoveOpen(true)}>
                <X size={15}/>
            </Button>
        </div>
        <Dialog open={removeOpen} onOpenChange={(e)=> setremoveOpen(e)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove From Cart</DialogTitle>
              <DialogDescription>
                Are you sure that you want to remove <span className="font-medium text-black">{props?.size.product.name}</span> from your cart?
                                    <div className="flex items-center justify-end mt-5">
                                        <Button size='sm' variant='outline' onClick={e=> setremoveOpen(false)}>Cancel</Button>
                                        <Button size='sm' variant='destructive' className='ml-1' onClick={()=> removeFromCart(props.id)}>{isLoading&&<Loader2 className='mr-1 animate-spin'/>}Remove</Button>
                                    </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default CartProduct