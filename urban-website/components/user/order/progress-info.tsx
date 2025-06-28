import { DeliveryStatus } from '@/components/api/cart/cart.model'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bike, Check, Hand, Package } from 'lucide-react'
import React from 'react'

interface ProgressInfoProps {
  props:string
}

const ProgressInfo = ({props}:ProgressInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Progress</CardTitle>
      </CardHeader>
      <CardContent className='flex items-center justify-center'>
        <div className='flex flex-col items-center space-y-2'>
            <div className='h-[50px] w-[50px] bg-primary rounded-full flex items-center justify-center'>
                <Check className='text-primary-foreground'/>
            </div>
            <p className="text-center text-sm">Order Taken</p>
        </div>
        <div className='h-[2px] w-[50px] bg-primary -mt-5'/>

        <div className='flex flex-col items-center space-y-2'>
            <div className={`${(props=="DISPATCHED" || props == "DELIVERED")&&"bg-primary"} h-[50px] w-[50px] border border-primary rounded-full flex items-center justify-center`}>
                {(props=="DISPATCHED" || props == "DELIVERED")?<Check className='text-primary-foreground'/>:<Bike className='text-primary'/>}
            </div>
            <p className="text-center text-sm">Shipped</p>
        </div>
        <div className='h-[2px] w-[50px] bg-primary -mt-5'/>

        <div className='flex flex-col items-center space-y-2'>
            <div className={`${(props == "DELIVERED")&&"bg-primary"} h-[50px] w-[50px] border border-primary rounded-full flex items-center justify-center`}>
                {(props == "DELIVERED")?<Check className='text-primary-foreground'/>:<Package className='text-primary'/>}
            </div>
            <p className="text-center text-sm">Delivered</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgressInfo