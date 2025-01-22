import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const UpdateDeliveryStatus = () => {
  return (
    <Card className='mt-3'>
        <CardHeader>
        <CardTitle className="font-semibold">Update Delivery</CardTitle>
        <div className="pt-3 flex items-center gap-3">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Button>Update</Button>
        </div>
        </CardHeader>
    </Card>
  )
}

export default UpdateDeliveryStatus