import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

const CartProduct = () => {
  return (
    <div className='flex gap-2 w-full justify-between'>
        <Image width={100} height={100} src="/1.jpg" alt="Image" className="object-cover h-[70px] w-[70px]" />
        <div>
            <p className="font-semibold text-primary">Random Product</p>
            <p className="text-gray-500 text-xs">Variant</p>
            <p className="text-sm font-semibold mt-2 text-primary">$190</p>
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