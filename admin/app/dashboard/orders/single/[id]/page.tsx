"use client"
import { useGetSingleOrderQuery, useLazyGetSingleBatchOrderQuery, useLazyGetSingleOrderQuery } from '@/components/orders/api/orders.api'
import CustomerInfo from '@/components/orders/single-order/customer-info'
import DeliveryStatusContainer from '@/components/orders/single-order/delivery-status-container'
import OtherOrdersOfCustomer from '@/components/orders/single-order/other-orders'
import ProductsInfo from '@/components/orders/single-order/product-info'
import UpdateDeliveryStatus from '@/components/orders/single-order/update-delivery-status'
import { Skeleton } from '@/components/ui/skeleton'
import { auth } from '@/firebase/firebase'
import { toast } from '@/hooks/use-toast'
import { onAuthStateChanged } from 'firebase/auth'
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

    const [getBatchItems,{
        data:batchData,
        error:batchError,
        isLoading:batchIsLoading,
        isSuccess:batchIsSuccess,
        isError:batchIsError
    }] = useLazyGetSingleBatchOrderQuery()
    
    const refetch = () => {
        getOrder(String(param.id))
    }


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                if(param){
                    refetch()
                }
            }
        })
      
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
            getBatchItems(data.batchId)
            console.log(data)
        }
    }, [isError,isSuccess])

    useEffect(() => {
      
        if(batchIsError){
            toast({
                title:'Error',
                description:"Check console",
                variant:'destructive'
            })
            console.log(batchError)
        }

        if(batchIsSuccess){
            toast({
                title:'Success',
                description:"Batch fetched",
            })
            console.log(batchData)
        }



    }, [batchData,batchError,batchIsSuccess,batchIsError])
    
    
    
  return (
    <div className='p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
        {batchIsLoading?<Skeleton className='h-[250px]'/>:batchData&&<ProductsInfo deliveryCharge={Number(data?.cart.deliveryCharge)} products={batchData} />}
        <div>
        {isLoading?<Skeleton className='h-[250px]'/>:data?.deliveryStatus&&<DeliveryStatusContainer props={data.deliveryStatus}/>}
        {isLoading?<Skeleton className='h-[100px]'/>:data?.deliveryStatus&&<UpdateDeliveryStatus refetch={refetch} status={data?.deliveryStatus} id={data.batchId}/>}
        </div>
        {isLoading?<Skeleton className='h-[250px]'/>:data?.cart&&<CustomerInfo {...data?.cart.customer}/>}
        <OtherOrdersOfCustomer/>
    </div>
  )
}

export default SingleOrderPage