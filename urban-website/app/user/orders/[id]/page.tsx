"use client"
import { useLazyGetSingleOrderQuery } from '@/components/api/cart/cart.api'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import PricingInfo from '@/components/user/order/pricing-info'
import ProductInfo from '@/components/user/order/product-info'
import ProgressInfo from '@/components/user/order/progress-info'
import UserInfo from '@/components/user/order/user-info'
import { auth } from '@/firebase/firebase'
import { useToast } from '@/hooks/use-toast'
import { onAuthStateChanged } from 'firebase/auth'
import { useParams, useRouter } from 'next/navigation'
import React, { use, useEffect } from 'react'

const SingleOrderPage = () => {
  const [getOrder,{data:order,isLoading:orderLoading,isSuccess:orderSuccess,isError:orderError}] = useLazyGetSingleOrderQuery()
  const router = useRouter()
  const {toast} = useToast()
  const param  = useParams()

  useEffect(() => {
    if(orderError){
      toast({
        title:'Error',
        description:'Cannot fetch order data',
        variant:'destructive'
      })
    }
  }, [orderError])

  useEffect(() => {
    if(orderSuccess){
      console.log(order)
    }
  }, [orderSuccess])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      }
      else{
        user.getIdToken().then((token) => {
          getOrder({token,id:String(param.id)})
        }).catch((e) => {
          console.log(e)
        })
      }
    })
  }, [])
  

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/user/orders">Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Single Order</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
      {orderLoading?<Skeleton className='w-full h-[300px]'/>:order&&<ProgressInfo props={order?.deliveryStatus}/>}
      {orderLoading?<Skeleton className='w-full h-[300px]'/>:order&&<ProductInfo items={order?.cart.items} deliveryCharge={order.cart.deliveryCharge}/>}
      {orderLoading?<Skeleton className='w-full h-[200px]'/>:order&&<UserInfo {...order.cart.customer} />}
    </div> */}
    </div>
  )
}

export default SingleOrderPage