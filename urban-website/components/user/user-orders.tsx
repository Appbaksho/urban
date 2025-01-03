import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import UserOrderAdapter from './user-order-adapter'
import { Cart, Item } from '@/api/cart/cart.model'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'


export interface UserOrders {
  id: string
  customerId: string
  deliveryCharge: number
  items: Item[]
}

const UserOrders = (props:UserOrders) => {
  return (
    <div className='w-full overflow-x-hidden'>
      <ScrollArea className="flex flex-1 md:w-auto w-[100vw] whitespace-nowrap rounded-md border">
        <Table>
          <TableCaption>A list of your orders.</TableCaption>
          <TableHeader className="bg-primary [&>tr>th]:text-primary-foreground hover:bg-primary">
            <TableRow className='rounded-xl'>
              <TableHead className="w-[100px] rounded-lt-md">#ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className=''>Method</TableHead>
              <TableHead className=''>Order Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              props.items.map((cart) => (
                    <UserOrderAdapter key={cart.id} {...cart} />
                ))
            }
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default UserOrders