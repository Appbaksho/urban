"use client"
import { useGetCustomerQuery, useLazyGetCustomerQuery } from '@/api/customer/customer.api'
import { Skeleton } from '@/components/ui/skeleton'
import UserEdit from '@/components/user/user-edit'
import UserProfile from '@/components/user/user-profile'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

const UserPage = () => {
  const [edit, setedit] = useState<boolean>(false)
  const [getCustomer,{isError,isLoading,isSuccess,data}] = useLazyGetCustomerQuery()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getCustomer(user.uid)
      } 
    })
  }, [edit])

  
  
  return (
    <div>
      {/* {data?<UserProfile {...data} setEditOpen={setedit}/>:<Skeleton className='w-full h-[300px]'/>}
      {data&&<UserEdit user={data} open={edit} onToggle={setedit}/>} */}
    </div>
  )
}

export default UserPage