import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Copy } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import dayjs from 'dayjs'
import Link from 'next/link'
import { BatchOrder, Item } from './api/orders.model'

const OrdersAdapter = (props:BatchOrder) => {
  return (
    <TableRow className='py-2'>
        <TableCell className="font-medium w-[100px]">{String(props.batchId).length>10?String(props.batchId).substring(0,10)+"...":props.batchId}
          <Button size={'sm'} variant='secondary'
          onClick={() => {
            navigator.clipboard.writeText(props.batchId)
            toast({
              title: 'Copied',
              description: 'Order ID copied to clipboard',
            })
          }}
          >
            <Copy size={12} /> Copy
          </Button>
        </TableCell>
              <TableCell className='flex gap-2 items-center'><img src={props.orderDetail.imageUrl} className='h-[50px] w-[100px] object-cover rounded-md'/> 
              <div>
                <Link href={`/dashboard/orders/single/${props.id}`} className='font-bold'>{props.orderDetail.productName}</Link>
                <p className='mt-1'>Size: <span className='bg-primary-foreground text-primary py-1 px-2 rounded-md text-xs'>{props.orderDetail.size}</span> </p>
              </div>
              </TableCell>
              <TableCell>{dayjs(props.createdAt).format("DD-MM-YY hh:mm A")}</TableCell>
              <TableCell>
              <span className='bg-primary-foreground text-primary py-1 px-2 rounded-md text-xs italic'>{props.deliveryStatus.toLowerCase().replace("_"," ")}</span>
              </TableCell>
              <TableCell>
              <span className='bg-primary-foreground text-primary py-1 px-2 rounded-md text-xs italic'>{props.paymentStatus.toLowerCase().replace("_"," ")}</span>
              </TableCell>
              <TableCell className='text-right'>{props.orderDetail.price*props.orderDetail.quantity} BDT</TableCell>
    </TableRow>
  )
}

export default OrdersAdapter