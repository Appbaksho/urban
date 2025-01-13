import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Item, Order } from './api/orders.api'

const OrdersAdapter = (props:Item) => {
  return (
    <TableRow className='py-2'>
        <TableCell className="font-medium w-[100px]">{props.id}</TableCell>
              <TableCell>{props.size.product.name}</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">.00</TableCell>
    </TableRow>
  )
}

export default OrdersAdapter