"use client"
import { useGetSingleOrderQuery, useLazyGetSingleOrderQuery } from '@/components/orders/api/orders.api'
import CustomerInfo from '@/components/orders/single-order/customer-info'
import DeliveryStatusContainer from '@/components/orders/single-order/delivery-status-container'
import OtherOrdersOfCustomer from '@/components/orders/single-order/other-orders'
import ProductsInfo from '@/components/orders/single-order/product-info'
import UpdateDeliveryStatus from '@/components/orders/single-order/update-delivery-status'
import { toast } from '@/hooks/use-toast'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const SingleOrderPage = () => {
    const param = useParams()
    const [getOrder,{
        data,
        error,
        isLoading,
        isSuccess,
        isError
    }] = useLazyGetSingleOrderQuery()
    
    useEffect(() => {
      if(param){
        getOrder(String(param.id))
      }
    }, [param])

    useEffect(() => {
        if(isError){
            toast({
                title:'Error',
                description:"Check console",
                variant:'destructive'
            })
            console.log(error)
        }
        if(isSuccess){
            toast({
                title:'Success',
                description:"Order fetched",
            })
            console.log(data)
        }
    }, [isError,isSuccess])
    
    
  return (
    <div className='p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
        {data?.cart&&<CustomerInfo {...data?.cart.customer}/>}
        <div>
        <DeliveryStatusContainer/>
        <UpdateDeliveryStatus/>
        </div>
        <div className="md:col-span-2">
        <ProductsInfo/>
        <OtherOrdersOfCustomer/>
        </div>
        
    </div>
  )
}

export default SingleOrderPage