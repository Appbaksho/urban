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
        <div className="grid  grid-cols-1 md:grid-cols-5">
            <div className='md:col-span-4'>
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
        <div className="mt-10">
            <p className='font-semibold'>Description</p>
            <p className="text-sm text-gray-600 mt-2">
                The Pookie Hoodie is the perfect blend of comfort and style. Made from high-quality materials, this hoodie is designed to keep you warm and cozy during the colder months. It features a modern, relaxed fit that is perfect for everyday wear. The Pookie Hoodie comes in a variety of sizes to ensure a perfect fit for everyone. Whether you're lounging at home or out and about, this hoodie is a versatile addition to your wardrobe. With its stylish design and comfortable feel, the Pookie Hoodie is sure to become your go-to choice for any casual occasion.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <div>
                <p className='font-semibold'>Details</p>
                <ul className='mt-2 list-disc list-inside'>
                    <li className='text-sm text-gray-600'>Material: 100% Cotton</li>
                    <li className='text-sm text-gray-600'>Fit: Relaxed</li>
                    <li className='text-sm text-gray-600'>Style: Casual</li>
                    <li className='text-sm text-gray-600'>Care: Machine Wash</li>
                </ul>
            </div>
            <div>
                <p className='font-semibold'>Size Description</p>
                <ul className='mt-2 list-disc list-inside'>
                    <li className='text-sm text-gray-600'>S: Chest 36" Length 26"</li>
                    <li className='text-sm text-gray-600'>M: Chest 38" Length 27"</li>
                    <li className='text-sm text-gray-600'>L: Chest 40" Length 28"</li>
                    <li className='text-sm text-gray-600'>XL: Chest 42" Length 29"</li>
                    <li className='text-sm text-gray-600'>XXL: Chest 44" Length 30"</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ProductDescriptionSingle