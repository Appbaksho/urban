"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useGetOrdersQuery } from './api/orders.model'
import { Skeleton } from '../ui/skeleton'
import OrdersAdapter from './orders-adapter'

const OrdersTable = () => {
    const [query, setquery] = useState<string>('')
    const {data:orders,isLoading,isError,error} = useGetOrdersQuery()
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
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            
              {
                isLoading?Array(10).fill("_").map((_,i)=><TableCell colSpan={4}>
                  <Skeleton className='w-full h-[50px]' key={i}/>
                </TableCell>):orders?.filter(v=>{
                  if(query.trim()=='') return v
                  if(v.items.find(i=>i.id.includes(query.toLowerCase()))) return v
                  if(v.items.find(i=>i.size.product.name.toLowerCase().includes(query.toLowerCase()))) return v
                  if(v.items.find(i=>i.size.name.toLowerCase().includes(query.toLowerCase()))) return v
                  
                }).map(order => (
                    order.items.map((item) => (
                        <OrdersAdapter key={item.id} {...item}/>
                    ))
                ))
              }
          </TableBody>
        </Table>
    </div>
  )
}

export default OrdersTable