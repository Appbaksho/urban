"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const OrdersTable = () => {
    const [query, setquery] = useState<string>('')
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
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    </div>
  )
}

export default OrdersTable