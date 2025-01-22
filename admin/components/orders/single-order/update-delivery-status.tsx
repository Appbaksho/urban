"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import { useUpdateOrderMutation } from '../api/orders.api'
import { Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface UpdateDeliveryStatusProps {
    status:string
    refetch:()=>void
    id:string
}

const UpdateDeliveryStatus = (props:UpdateDeliveryStatusProps) => {
    const [deliveryStatus, setdeliveryStatus] = useState<string>(props.status)
    const [
        updateOrder,
        {   isLoading: isUpdatingOrder,
            isSuccess: isOrderUpdated,
            isError: isOrderUpdateError,
            error: orderUpdateError
        }
    ] = useUpdateOrderMutation()

    useEffect(() => {
      
        if(isOrderUpdated){
            props.refetch()
            toast({
                title:'Success',
                description:"Order Updated",
            })
        }
        if(isOrderUpdateError){
            console.log(orderUpdateError)
            toast({
                title:'Error',
                description:"Check console",
                variant:'destructive'
            })
        }
    }, [isOrderUpdated,isOrderUpdateError])
    


    


  return (
    <Card className='mt-3'>
        <CardHeader>
        <CardTitle className="font-semibold">Update Delivery</CardTitle>
        <div className="pt-3 flex items-center gap-3">
        <Select value={deliveryStatus} onValueChange={e=>setdeliveryStatus(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Order Received</SelectItem>
            <SelectItem value="DISPATCHED">Shipped</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
          </SelectContent>
        </Select>
        <Button 
        onClick={()=>updateOrder({deliveryStatus:deliveryStatus,id:props.id})}
        disabled={props.status==deliveryStatus}>{isUpdatingOrder&&<Loader2 className='animate-spin mr-1' size={15}/>}Update</Button>
        </div>
        </CardHeader>
    </Card>
  )
}

export default UpdateDeliveryStatus