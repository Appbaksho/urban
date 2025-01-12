"use client"
import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { BadgePercent, Heart, Loader2, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from '../ui/button'
import { Product, Size } from '@/api/products/products.model'
import { useAddToWishlistMutation } from '@/api/products/products.api'
import { useToast } from '@/hooks/use-toast'
import { useAddToCartMutation } from '@/api/cart/cart.api'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'




const ProductDescriptionSingle = (props:Product) => {
    const [quantity, setquantity] = useState<number>(1)
    const [size, setsize] = useState<Size|null>(null)
    const [addToFavorite,{data,error,isLoading:addingWishlist,isError,isSuccess}] = useAddToWishlistMutation()
    const [addToCart,{data:cartData,error:cartError,isLoading:addingCart,isError:cartIsError,isSuccess:cartIsSuccess}] = useAddToCartMutation()

    const {toast} = useToast()
    useEffect(() => {
        if(isError){
            toast({
                title:'Error',
                description:"Cannot add to wishlist",
                variant:'destructive'
            })
            console.log(error)
        }
        if(isSuccess){
            toast({
                title:'Added',
                description:"Added to wishlist"
            })
        }
    }, [isError,isSuccess])


    useEffect(() => {
        if(cartIsError){
            toast({
                title:'Error',
                description:"Cannot add to cart",
                variant:'destructive'
            })
            console.log(cartError)
        }
        if(cartIsSuccess){
            toast({
                title:'Added',
                description:"Added to cart"
            })
        }
    }, [cartIsError,cartIsSuccess])


    const addToCartFiltered = ()=>{
        if(size){
        onAuthStateChanged(auth, (user) => {
            if (user) {
                addToCart({
                    productId:String(props.id),
                    sizeId:String(size?.id),
                    quantity:quantity
                })
            }
            else{
                const previous = localStorage.getItem('cart')
                if(previous){
                    const prev = JSON.parse(previous)
                    if(Array.isArray(prev)){
                    if(prev.filter(v=> v.productId==String(props.id)).length>0){
                        toast({
                            title:'Already in cart',
                            description:"This product is already in cart",
                            variant:'destructive'
                        })
                    }
                    else{
                        localStorage.setItem('cart',JSON.stringify([...prev,{
                            productId:String(props.id),
                            sizeId:String(size?.id),
                            quantity:quantity
                        }]))
                        toast({
                            title:'Added',
                            description:"Added to cart"
                        })
                    }
                }
                else{
                    localStorage.setItem('cart',JSON.stringify([{
                        productId:String(props.id),
                        sizeId:String(size?.id),
                        quantity:quantity
                    }]))
                    toast({
                        title:'Added',
                        description:"Added to cart"
                    })
                    
                }
                }
                else{
                    localStorage.setItem('cart',JSON.stringify([{
                        productId:String(props.id),
                        sizeId:String(size?.id),
                        quantity:quantity
                    }]))
                    toast({
                        title:'Added',
                        description:"Added to cart"
                    })
                }

                
            }
        })
    }
    else{
        toast({
            title:'Select Size',
            description:"Please select a size to add to cart",
            variant:'destructive'
        })
    }
    }






    useEffect(() => {
      setquantity(1)
    }, [size?.id])
    

  return (
    <div className=''>
        <h1 className='text-3xl md:text-4xl font-extrabold'>{props.name}</h1>
        <div className="mt-10 mb-5">
            <p className='text-sm text-gray-600'>Price</p>

            <p className='font-bold text-2xl flex items-center gap-2'> {props.discountPrice?props.discountPrice:props.price} BDT{props.discountPrice&&<BadgePercent className='fill-primary' color='#fff'/>}</p>
            {props.discountPrice&&<p className='font-medium text-lg line-through text-gray-600'> {props.discountPrice?props.discountPrice:props.price} BDT</p>}
        </div>
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
            <Button size="lg" disabled={addingCart} onClick={addToCartFiltered}>{addingCart?<Loader2 className='animate-spin mr-2' size={16}/>:<ShoppingBag size={16} className='mr-2'/>} Add to Cart</Button>
            <Button size="icon" onClick={()=> addToFavorite(String(props.id))} variant="outline" disabled={addingWishlist}>{addingWishlist?<Loader2 size={17} className='animate-spin'/>:<Heart size={17}/>}</Button>
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