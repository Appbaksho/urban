import React, { use, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import CheckoutProduct from './checkout-product'
import { useLazyGetCartQuery } from '@/api/cart/cart.api'
import { useToast } from '@/hooks/use-toast'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { Skeleton } from '../ui/skeleton'
import CheckoutProductOffline from './checkout-product-offline'
import { AddToCartPayload } from '@/api/cart/cart.model'

const CheckoutProducts = () => {
  const [getCart,{data:cart,isError,isSuccess,isLoading,error}] = useLazyGetCartQuery()
  const [isOffline, setisOffline] = useState<boolean>(false)
  const [offlineProducts, setofflineProducts] = useState<AddToCartPayload[]>([])
  const {toast} = useToast()
  const [total, settotal] = useState(0)

  useEffect(() => {
    if(isError){
      toast({
        title:'Error',
        description:'Cannot fetch cart data',
        variant:'destructive'
      })
      console.log(error)
    }
    if(isSuccess){
      settotal(cart?.items.reduce((acc,v)=>acc+v.size.product.price*v.quantity,0))
    }
  }, [isError,isSuccess])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        user.getIdToken().then((token)=>{ 
          getCart(token)
        }).catch((e)=>{
          console.log(e)
          setisOffline(true)
        })
      }
      else{
        setisOffline(true)
      }
    })
  }, [])

  useEffect(() => {
    if(isOffline){
      // settotal(JSON.parse(localStorage.getItem('cart')||'[]').reduce((acc:any,v:any)=>acc+v.size.product.price*v.quantity,0))
      setofflineProducts(JSON.parse(localStorage.getItem('cart')||'[]'))

    }
  }, [isOffline])

  

  return (
    <div>
      <p className='font-bold text-xl'>Selected Products</p>
      <Card className='mt-3'>
        <CardContent className='py-5'>
          <CardDescription className='text-xs'>Scroll Down if you cannot see all products</CardDescription>
          <ScrollArea className="h-[200px] w-full p-1">
            {isOffline?offlineProducts.map((v,i)=>{
              return <CheckoutProductOffline products={offlineProducts} settotal={settotal} quantity={Number(v.quantity)} id={v.productId} key={v.sizeId} />
            }):isLoading?Array(5).fill(0).map((v,i)=>{
                return <Skeleton key={i} className="w-full h-[80px]"/>
              }):cart?.items.map((v)=>{
                return <CheckoutProduct key={v.id} {...v}/>
              })
            }
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <p className='text-right flex-1 w-full'>Total : <span className="font-bold">{total} BDT</span></p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CheckoutProducts