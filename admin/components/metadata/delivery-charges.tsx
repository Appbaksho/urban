"use client"
import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { MetaData } from './api/metadata.model'
import { useUpdateDeliveryChargesMutation } from './api/metadata.api'
import { toast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

const DeliveryCharges = (props:MetaData) => {
  const [inside, setinside] = useState<string>(String(props.deliveryCharge))
  const [outside, setoutside] = useState<string>(String(props.deliveryChargeOutsideDhaka)) 
  const [editDeliveryCharges,{
    isLoading: isUpdatingDeliveryCharges,
    isSuccess: isDeliveryChargesUpdated,
    isError: isDeliveryChargesUpdateError,
    error: deliveryChargesUpdateError
  }] = useUpdateDeliveryChargesMutation()

  const updateDeliveryCharges = () => {
    editDeliveryCharges({deliveryCharge:{inside:Number(inside),outside:Number(outside)}})
  }

  useEffect(() => {
    setinside(String(props.deliveryCharge))
    setoutside(String(props.deliveryChargeOutsideDhaka))
  }, [props.deliveryCharge,props.deliveryChargeOutsideDhaka])

  useEffect(() => {
    if(isDeliveryChargesUpdated){
      if(props.refetch){
        props.refetch()
      }
      toast({
        title:"Success!",
        description:"Delivery charges updated successfully"
      })
    }
    if(isDeliveryChargesUpdateError){
      console.log(deliveryChargesUpdateError)
      toast({
        variant:'destructive',
        title:"Error!",
        description:"Failed to update delivery charges. contact with the developer"
      })
    }
  }, [isDeliveryChargesUpdated,isDeliveryChargesUpdateError])
  return (
    <div className='mt-5'>
      <p className='font-bold text-xl'>Delivery Charges</p>
        <Card className="mt-5 p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Inside Dhaka</Label>
              <Input placeholder='Charge' value={inside} onChange={e=> setinside(e.target.value)} />
            </div>
            <div>
              <Label>Outside Dhaka</Label>
              <Input placeholder='Charge' value={outside} onChange={e=> setoutside(e.target.value)} />
            </div>
          </div>
            <div className="flex items-center gap-2 justify-end mt-3">
            <Button onClick={updateDeliveryCharges} disabled={!inside||!outside||(inside==String(props.deliveryCharge)&&outside==String(props.deliveryChargeOutsideDhaka))||isUpdatingDeliveryCharges}>{isUpdatingDeliveryCharges&&<Loader2 size={15} className="animate-spin"/>}Update</Button>
            </div>
        </Card>
    </div>
  )
}

export default DeliveryCharges  