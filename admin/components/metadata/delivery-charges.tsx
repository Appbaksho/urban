"use client"
import React, { useState } from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { MetaData } from './api/metadata.model'

const DeliveryCharges = (props:MetaData) => {
  const [inside, setinside] = useState<string>(String(props.deliveryCharge))
  const [outside, setoutside] = useState<string>(String(props.deliveryChargeOutsideDhaka)) 
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
            <Button disabled={!inside||!outside||(inside==String(props.deliveryCharge)&&outside==String(props.deliveryChargeOutsideDhaka))}>Update</Button>
            </div>
        </Card>
    </div>
  )
}

export default DeliveryCharges  