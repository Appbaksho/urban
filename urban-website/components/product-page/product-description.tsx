"use client"
import React, { useState } from 'react'
import { Card } from '../ui/card'
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from '../ui/button'

const ProductDescriptionSingle = () => {
    const [quantity, setquantity] = useState<number>(0)
    const [size, setsize] = useState("")
  return (
    <div className=''>
        <h1 className='text-3xl md:text-4xl font-extrabold'>Pookie Hoodie</h1>
        <div className="grid grid-cols-5">
            <div className='col-span-4'>
                <p className='mt-5 text-sm'>Available Sizes</p>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-2">
                    <Card className={`p-2 font-regular transition-all ease-in-out duration-300 text-sm text-center rounded-md  ${size=="s"&&"font-extrabold border-primary/50 bg-primary/10"}`} onClick={
                        e=> setsize("s")
                    }>S</Card>

                    <Card className={`p-2 font-regular transition-all ease-in-out duration-300 text-sm text-center rounded-md  ${size=="m"&&"font-extrabold border-primary/50 bg-primary/10"}`} onClick={
                        e=> setsize("m")
                    }>M</Card>

                    <Card className={`p-2 font-regular transition-all ease-in-out duration-300 text-sm text-center rounded-md  ${size=="l"&&"font-extrabold border-primary/50 bg-primary/10"}`} onClick={
                        e=> setsize("l")
                    }>L</Card>

                    <Card className={`p-2 font-regular transition-all ease-in-out duration-300 text-sm text-center  rounded-md ${size=="xl"&&"font-extrabold border-primary/50 bg-primary/10"}`} onClick={
                        e=> setsize("xl")
                    }>XL</Card>

                    <Card className={`p-2 font-regular transition-all ease-in-out duration-300 text-sm text-center $ rounded-md ${size=="xxl"&&"font-extrabold border-primary/50 bg-primary/10"}`} onClick={
                        e=> setsize("xxl")
                    }>XXL</Card>
                    
                    </div>
            </div>
        <div className='col-span-1'>
        <p className='mt-5 text-right text-sm'>Qauntity</p>
        <div className="flex items-center justify-end">
        <Card className='mt-1 p-1 w-[100px] flex items-center justify-between'>
            
            <Button size="sm" variant="secondary" onClick={e=> setquantity(quantity+1)}>
                <Plus size={13}/>
            </Button>
            <p className='text-sm'>
            {String(quantity)}
            </p>
            <Button size="sm" variant="secondary" onClick={e=> setquantity(p=> p>1?p-1:p)}>
                <Minus size={13}/>
            </Button>
        </Card>
        </div>
        </div>
        </div>
        <div className='mt-5 flex items-center gap-2'> 
            <Button size="lg"><ShoppingBag size={16} className='mr-2'/> Add to Cart</Button>
            <Button size="icon" variant="outline"><Heart size={17}/></Button>
        </div>
    </div>
  )
}

export default ProductDescriptionSingle