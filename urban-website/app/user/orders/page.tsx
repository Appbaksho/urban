"use client"
import { useLazyGetOrdersQuery } from '@/components/api/cart/cart.api'
import { Skeleton } from '@/components/ui/skeleton'
import UserOrders from '@/components/user/user-orders'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { use, useEffect } from 'react'

const OrdersPage = () => {
  const [getOrders,{data:orders,isLoading:ordersLoading,isSuccess:ordersSuccess,isError:ordersError}] = useLazyGetOrdersQuery()
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      }
      else{
        user.getIdToken().then((token) => {
          getOrders(token)
        }).catch((e) => {
          console.log(e)
        })
      }
    })
  }, [])

  useEffect(() => {
    if(ordersError){
      console.log(ordersError)
    }
  }
  , [ordersError])

  useEffect(() => {
    if(ordersSuccess){
      console.log(orders)
    }
  }
  , [ordersSuccess])
  

  return (
    <div>
        {ordersLoading?<Skeleton className='w-full h-[300px]'/>:orders&&<UserOrders {...orders}/>}
    </div>
  )
}

export default OrdersPage