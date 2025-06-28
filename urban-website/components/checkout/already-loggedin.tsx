import React, { useEffect } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useGetCustomerQuery, useLazyGetCustomerQuery } from '@/components/api/customer/customer.api'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '../ui/skeleton'

interface AlreadyLoggedInProps {
  uid:string
}

const AlreadyLoggedIn = (props:AlreadyLoggedInProps) => {
  const {data:profile,isError,isLoading} = useGetCustomerQuery(props.uid)
  const {toast} = useToast()

  useEffect(() => {
      if(isError){
         toast({
              title:'Error',
              description:'Cannot fetch user data',
              variant:'destructive'
         })
      }
  }, [isError])
  


  return (
    <div>
        <Card className='mt-3'>
        <CardHeader>
          <CardTitle>{profile?.name}</CardTitle>
          {isLoading?<Skeleton className='w-full h-[200px]'/>:<CardDescription className='grid grid-cols-2 [&>*]:text-sm [&>*]:text-gray-700 pt-5 gap-3'>
          <p>Billing Address : </p>
          <p className='text-right'>{profile?.shippingAddress}</p>
          <p>City: </p>
          <p className='text-right'>{profile?.city}</p>
          <p>Zip: </p>
          <p className='text-right'>{profile?.zipCode}</p>
          </CardDescription>}
        </CardHeader>
      </Card>   
    </div>
  )
}

export default AlreadyLoggedIn