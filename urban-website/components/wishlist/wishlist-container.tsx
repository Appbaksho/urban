"use client"
import React, { useEffect } from 'react'
import WishlistAdapter from './wishlist-adapter'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '../ui/skeleton'
import { useLazyGetWishlistQuery } from '@/api/products/products.api'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

const WishlistContainer = () => {
  const [getWishlist,{data:wishlist,isLoading,isSuccess,isError,error}] = useLazyGetWishlistQuery()
  const {toast} = useToast()
  React.useEffect(() => {
    if(isError){
      toast({
        title:'Error',
        description:"Cannot get wishlist",
        variant:'destructive'
      })
      console.log(error)
    }
  }, [isError])

  useEffect(() => {
    if(isSuccess){
      console.log(wishlist)
    }
  }, [isSuccess])
  
  const getWishlistMuted = ()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          getWishlist(token)
        }).catch((error) => {
          console.log(error)
        })
      }
    })
  }

  useEffect(() => {
    getWishlistMuted()
  }, [])
  


  return (
    <div className='p-5 md:p-10'>
        <p className='text-xl font-semibold'>Your Wishlist</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
            {
                isLoading?Array.from({length: 8}).map((_,i)=>(
                    <Skeleton className='h-[200px] w-full' key={i}/>
                )):wishlist?.length==0?<p className='my-10 text-center text-sm col-span-2 md:col-span-3 lg:col-span-4 text-gray-500'>No product in wishlist</p>:wishlist?.map((v)=>{
                    return <WishlistAdapter refetch={getWishlistMuted} {...v.product} key={v.productId}/>
                })
            }
        </div>
    </div>
  )
}

export default WishlistContainer