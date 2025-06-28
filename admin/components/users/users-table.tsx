"use client"
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import UsersAdapter from './users-adapter'
import { useGetCustomersQuery } from './api/customer.api'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '../ui/skeleton'
import { Input } from '../ui/input'


const UsersTable = () => {
  const {data:data,isError,error,isLoading} = useGetCustomersQuery()
  const {toast} = useToast()
  const [query, setquery] = useState<string>('')

  useEffect(() => {
    if(isError){
      toast({
        title: 'Error',
        description: 'Cannot get users',
        variant:'destructive',
      })
      console.log(error)
    }
  }, [isError])
  
  return (
    <div>
      <div className="flex justify-end">
                  <div className="">
                      <Input type="text" value={query} onChange={e=> setquery(e.target.value)} placeholder="Search..." />
                  </div>
              </div>
    <Table className='mt-5'>
      <TableCaption>A list of urban users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Zip Code</TableHead>
          <TableHead className="text-right">Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          isLoading?Array(10).fill("_").map((_,i)=><TableRow>
            <TableCell colSpan={7}>
              <Skeleton className='w-full h-[50px]' key={i}/>
            </TableCell>
          </TableRow>):data?.filter(v=>{
            if(query.trim()=='') return v
            if(v.name.toLowerCase().includes(query.toLowerCase())) return v
            if(v.email.toLowerCase().includes(query.toLowerCase())) return v
            if(v.contactNumbers[0].toLowerCase().includes(query.toLowerCase())) return v
            if(v.shippingAddress.toLowerCase().includes(query.toLowerCase())) return v
            if(v.city.toLowerCase().includes(query.toLowerCase())) return v
            if(v.zipCode.toLowerCase().includes(query.toLowerCase())) return v
          }).map(user => (
            <UsersAdapter key={user.firebaseId} {...user}/>
          ))
        }
      </TableBody>
    </Table>
    </div>
  )
}

export default UsersTable