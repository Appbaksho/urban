import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { Product } from '@/api/products/products.model'
import { Item, Size } from '@/api/cart/cart.model'
import { Badge } from '../ui/badge'

const CartProduct = (props:Item) => {
  return (
    <div className='flex gap-2 w-full justify-between'>
        <img width={100} height={100} src={props.size.product.imageUrl[0]} alt="Cart Item Image" className="object-cover h-[70px] w-[70px] rounded-md" />
        <div className='w-full flex flex-col items-start'>
            <p className="font-semibold text-primary">{props.size.product.name}</p>
            <div className="flex items-center mt-1">
            <p className="text-xs mr-2">Size</p> <Badge variant="outline" className='text-xs'>{props.size.name}</Badge>
            </div>
            
            <p className="text-sm font-semibold mt-2 text-primary">{props.size.product.price} BDT</p>
        </div>
        <div className='flex justify-end'>
            <Button size="icon" className='h-[20px] w-[20px] bg-red-200 hover:bg-red-200/70 text-red-500'>
                <X size={15}/>
            </Button>
        </div>
    </div>
  )
}

export default CartProduct