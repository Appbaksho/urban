import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Copy } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Cart, Item } from '@/api/cart/cart.model'

const UserOrderAdapter = (props:Item) => {
  return (
    <TableRow className='py-3'>
              <TableCell>#{props.id} <Button className='text-xs' variant="outline" size="sm"><Copy size={15} className='mr-1'/> Copy</Button> </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                    <img src={props.size.product.imageUrl[0]} alt={props.size.product.name} className="w-12 h-12 rounded-md"/>
                  <div>
                    <Link href="/user/orders/random" className='font-medium underline'>{props.size.product.name}</Link>
                    <div className="text-xs text-gray-400">{props.size.product.description.substring(0,30)}...</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className='hidden md:flex items-center h-full'>
                <p>Cash On Delivery</p></TableCell>
              <TableCell className='text-right md:text-left'>
                <Badge className='italic font-normal bg-gray-200' variant="outline">{props.deliveryStatus}</Badge>
              </TableCell>
              <TableCell className="text-right hidden md:block">{props.size.product.price} BDT</TableCell>
    </TableRow>
  )
}

export default UserOrderAdapter