"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import OrdersAdapter from './orders-adapter'
import { useGetOrdersQuery } from './api/orders.api'

const OrdersTable = () => {
    const [query, setquery] = useState<string>('')
    const {data:orders,isLoading,isError,error} = useGetOrdersQuery()
    useEffect(() => {
      console.log(orders)
    }, [orders])
    
  return (
    <div className='p-5'>
        <div className="flex justify-end">
            <div>
                <Input type="text" placeholder="Search" value={query} onChange={e=> setquery(e.target.value)} />    
            </div>
        </div>
        <Table className='mt-5'>
          <TableCaption>A list of your orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Orderd On</TableHead>
              <TableHead>Delivery Status</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            
              {
                isLoading?Array(10).fill("_").map((_,i)=><TableCell colSpan={4}>
                  <Skeleton className='w-full h-[50px]' key={i}/>
                </TableCell>):orders?.filter(v=>{
                  if(query.trim()==''){
                    return v
                  }
                  if(v.filter(i=>i.id.includes(query.toLowerCase()))){
                    return v
                  }
                  if(v.filter(i=>i.orderDetail.productName.toLowerCase().includes(query.toLowerCase()))) return v
                  if(v.filter(i=>i.orderDetail.size.toLowerCase().includes(query.toLowerCase()))) return v
                  
                  
                }).map(order => (
                  order.map((v) =>
                    <OrdersAdapter {...v} key={v.id} />
                  )
                ))
              }
          </TableBody>
        </Table>
    </div>
  )
}

export default OrdersTable