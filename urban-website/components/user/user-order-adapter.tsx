import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Copy } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Cart, Item } from '@/api/cart/cart.model'

const UserOrderAdapter = (props:Item) => {

  const getDeliveryStatus = (status:string) => {
    switch (status) {
      case 'PENDING':
        return 'Order Received'
      case 'CHECKED_OUT':
        return 'Checked Out'
      case 'CANCELLED':
        return 'Cancelled'
      default:
        return 'Order Received'
    }
  }
  
  return (
    <TableRow className='py-3'>
              <TableCell>#{props.id.substring(0,5)}... <br/> <Button className='text-xs' variant="outline" size="sm"><Copy size={15} className='mr-1'/> Copy</Button> </TableCell>
              <TableCell className="flex items-center gap-2 w-full">
                    <img src={props.size.product.imageUrl[0]} alt={props.size.product.name} className="w-12 h-12 rounded-md"/>
                  <div className='w-[]'>
                    <Link href={`/user/orders/${props.id}`} className='font-medium underline'>{String(props.size.product.name).substring(0,30)}{String(props.size.product.name).length>30&&"..."}</Link>
                    <br/>
                    <Badge variant="secondary" className="text-xs font-medium">{props.size.name}</Badge>
                  </div>
              </TableCell>
              <TableCell className='text-xs'>Cash On Delivery</TableCell>
              <TableCell className='text-right md:text-left'>
                <Badge className='italic font-normal bg-gray-200' variant="outline">{getDeliveryStatus(props.orderStatus)}</Badge>

              </TableCell>
              <TableCell className="text-right">{props.size.product.price} BDT</TableCell>
    </TableRow>
  )
}

export default UserOrderAdapter