import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const UserInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Muztahid Rahman</CardTitle>
        <CardDescription className='text-sm'>random@gmail.com <br/> +880xxxxxxxxxx</CardDescription>
      </CardHeader>
      <CardContent className='text-xs'>
        <p>Shipping Address : 1234 Elm Street, Springfield, IL 62704
    </p>
      </CardContent>
    </Card>
  )
}

export default UserInfo