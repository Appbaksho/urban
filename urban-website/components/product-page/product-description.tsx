"use client"
import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from '../ui/button'
import { Product, Size } from '@/api/products/products.model'




const ProductDescriptionSingle = (props:Product) => {
    const [quantity, setquantity] = useState<number>(1)
    const [size, setsize] = useState<Size|null>(null)

    useEffect(() => {
      setquantity(1)
    }, [size?.id])
    

  return (
    <div className=''>
        <h1 className='text-3xl md:text-4xl font-extrabold'>{props.name}</h1>
        <div className="grid  grid-cols-1 md:grid-cols-5">
            <div className='md:col-span-4'>
                <p className='mt-5 text-sm'>Available Sizes</p>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-2">
                        {
                            props.sizes.map((v,i)=>(
                                <Card key={i} className={`p-2 ${v.stock==0&&"text-gray-500 bg-gray-100"} font-regular transition-all ease-in-out duration-300 text-sm text-center rounded-md  ${size?.id==v.id&&"font-extrabold border-primary/50 bg-primary/10"}`} onClick={
                                    ()=> v.stock>0&&setsize(v)
                                }>{v.name}</Card>
                            ))
                        }
                    
                    </div>
            </div>
        <div className='col-span-1'>
        <p className='mt-5 text-right text-sm'>Qauntity</p>
        <div className="flex items-center justify-end">
        <Card className='mt-1 p-1 w-[100px] flex items-center justify-between'>
            
            <Button size="sm" variant="secondary" onClick={e=> size&&quantity<size?.stock&&setquantity(quantity+1)}>   
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
                {props.description}
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <div>
                <p className='font-semibold'>Details</p>
                <ul className='mt-2 list-disc list-inside'>
                    {
                        props.details.map((v,i)=>(
                            <li key={i} className='text-sm text-gray-600'>{v}</li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <p className='font-semibold'>Size Description</p>
                <ul className='mt-2 list-disc list-inside'>
                    {
                        props.sizeDescription.map((v,i)=>(
                            <li key={i} className='text-sm text-gray-600'>{v}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ProductDescriptionSingle