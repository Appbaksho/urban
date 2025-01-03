import { UserPayload } from '@/api/auth/auth.model'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'

const UserInfo = (props:UserPayload) => {
  useEffect(() => {
    console.log(props)
  }, [props])
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription className='text-sm'>{String(props.contactNumbers[0])}</CardDescription>
      </CardHeader>
      <CardContent className='text-xs'>
        <p>Shipping Address : {props.shippingAddress}
    </p>
      </CardContent>
    </Card>
  )
}

export default UserInfo