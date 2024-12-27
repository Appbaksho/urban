import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

const AlreadyLoggedIn = () => {
  return (
    <div>
        <Card className='mt-3'>
        <CardHeader>
          <CardTitle>Muztahid Rahman</CardTitle>
          <CardDescription className='grid grid-cols-2 [&>*]:text-sm [&>*]:text-gray-700 pt-5'>
          <p >Billing Address</p>
          <p>Random Address</p>
          </CardDescription>
        </CardHeader>
      </Card>   
    </div>
  )
}

export default AlreadyLoggedIn