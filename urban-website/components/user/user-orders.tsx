import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import UserOrderAdapter from './user-order-adapter'

const UserOrders = () => {
  return (
    <div>
        <Table>
          <TableCaption>A list of your orders.</TableCaption>
          <TableHeader className="bg-primary [&>tr>th]:text-primary-foreground hover:bg-primary">
            <TableRow className='rounded-xl'>
              <TableHead className="w-[100px] rounded-lt-md">#ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
                Array.from({length: 5}).map((_, i) => (
                    <UserOrderAdapter key={i} />
                ))
            }
          </TableBody>
        </Table>
    </div>
  )
}

export default UserOrders