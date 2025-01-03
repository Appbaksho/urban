import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import UserOrderAdapter from './user-order-adapter'
import { Cart } from '@/api/cart/cart.model'


interface UserOrdersProps {
  carts:Cart[]
}

const UserOrders = (props:UserOrdersProps) => {
  return (
    <div>
        <Table>
          <TableCaption>A list of your orders.</TableCaption>
          <TableHeader className="bg-primary [&>tr>th]:text-primary-foreground hover:bg-primary">
            <TableRow className='rounded-xl'>
              <TableHead className="w-[100px] rounded-lt-md">#ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className='md:block hidden'>Method</TableHead>
              <TableHead className='text-right md:text-left'>Status</TableHead>
              <TableHead className="text-right hidden md:block">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
                props.carts.map((cart) => (
                  cart.items.map((item) => (
                    <UserOrderAdapter key={item.id} {...item} />
                  ))
                ))
            }
          </TableBody>
        </Table>
    </div>
  )
}

export default UserOrders