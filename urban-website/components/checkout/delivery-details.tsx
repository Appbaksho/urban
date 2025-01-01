import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

const DeliveryDetails = () => {
  return (
    <div>
      <p className='font-bold text-xl my-3'>Delivery Details</p>
    <Card>
      <CardContent className='pt-5'>
        <p className='text-xs font-semibold'>
          Inside Dhaka : 60tk <br/>
          All Over Bangladesh : 120tk
        </p>
        <div className="flex items-center gap-1 mt-5">
          <p className="italic text-sm">Currently Cash on delivery is available only</p>
        {/* <Checkbox id='cod' name='same-address'/>
        <Label htmlFor="cod">Cash On Delivery</Label>  */}
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default DeliveryDetails