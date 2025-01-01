"use client"
import { AddToCartPayload } from '@/api/cart/cart.model'
import { useGetProductsQuery, useGetSingleProductQuery } from '@/api/products/products.api'
import React, { useEffect, useState } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { X } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

interface CartProductOfflineProps extends AddToCartPayload {
    setOfflineProducts: React.Dispatch<React.SetStateAction<{price:number,quanity:number,id:string}[]>>
    setCartItems: React.Dispatch<React.SetStateAction<AddToCartPayload[]>>
}

const CartProductOffline = (props:CartProductOfflineProps) => {
    const {data:product,error,isLoading,isSuccess,isError} = useGetSingleProductQuery(String(props.productId))
    const [deleteOpen, setdeleteOpen] = useState<boolean>(false)

    useEffect(() => {
      if(isError){
        console.log(error)
      }
      if(isSuccess){
        props.setOfflineProducts((v)=>{
            const prev = v.filter((val)=>val.id==props.productId)
            if(prev.length>0){
                return [...v]
            }
            else{
                return [...v,{price:product?.price,quanity:props.quantity,id:props.productId}]
            }
        })
      }
    }, [isError,isSuccess])

    const removeItem = ()=>{
        const items = localStorage.getItem('cart')
        if(items){
            const prev = JSON.parse(items)
            const filtered = prev.filter((v:any)=>v.productId!=props.productId)
            localStorage.setItem('cart',JSON.stringify(filtered))
            props.setCartItems(filtered)
            props.setOfflineProducts((v)=>{
                return v.filter((val)=>val.id!=props.productId)
            })
            setdeleteOpen(false)
        }
    }
    

isLoading && <Skeleton className='w-[full] h-[150px]'/>
  return (
    <div className='flex gap-2 w-full justify-between'>
        <img width={100} height={100} src={product?.imageUrl[0]} alt="Cart Item Image" className="object-cover h-[70px] w-[70px] rounded-md" />
        <div className='w-full flex flex-col items-start'>
            <p className="font-semibold text-left text-primary">{product?.name}</p>
            <div className="flex items-center mt-1">
            <p className="text-xs mr-2">Size</p> {product?.sizes.filter(v=>v.id==props.sizeId).map(v=> <Badge variant="outline" className='text-xs'>{v.name}</Badge>)}
            <p className="text-xs ml-2 text-right">Qty : {props.quantity}</p>
            </div>
            
            <p className="text-sm font-semibold mt-2 text-primary">{Number(product?.price)*Number(props.quantity)} BDT</p>
        </div>
        <div className='flex justify-end'>
            <Dialog open={deleteOpen} onOpenChange={(e)=> setdeleteOpen(e)}>
              <DialogTrigger className={buttonVariants({variant:'outline',size:'icon',className:'h-[20px] w-[20px] bg-red-200 hover:text-red-600 hover:bg-red-200/70 text-red-500'})}><X size={15}/></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Remove Item</DialogTitle>
                  <DialogDescription className='text-sm'>
                    Are you sure that you want to remove <span className="font-medium text-black">{product?.name}</span> from your cart?
                    <div className="flex items-center justify-end mt-5">
                        <Button size='sm' variant='outline'>Cancel</Button>
                        <Button size='sm' variant='destructive' className='ml-1' onClick={removeItem}>Remove</Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
        </div>
    </div>
  )
}

export default CartProductOffline