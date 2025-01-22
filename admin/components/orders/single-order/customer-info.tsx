import { Card } from '@/components/ui/card'
import React from 'react'
import { Customer } from '../api/orders.model'

const CustomerInfo = (props:Customer) => {
    // name: string
    // email: string
    // photoUrl: string
    // shippingAddress: string
    // city: string
    // zipCode: string
    // contactNumbers: string[]
    // createdAt: string
    // updatedAt: string
  return (
    <Card className='p-3'>
        <p className='text-lg font-semibold'>Customer Information</p>
        <div className='mt-3 flex flex-col gap-2'>
            <p className='text-sm text-primary/70'>Name : <span className="text-white font-medium">{props.name}</span></p>
            <p className='text-sm text-primary/70'>Email : <span className="text-white font-medium">{props.name}</span></p>
            <p className='text-sm text-primary/70'>Phone : <span className="text-white font-medium">{props.contactNumbers[0]}</span></p>
            <p className='text-sm text-primary/70'>Shipping Address : <span className="text-white font-medium">{props.shippingAddress}</span></p>
            <p className='text-sm text-primary/70'>City : <span className="text-white font-medium">{props.city}</span></p>
            <p className='text-sm text-primary/70'>Zip Code : <span className="text-white font-medium">{props.zipCode}</span></p>
        </div>
    </Card>
  )
}

export default CustomerInfo