import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Item, Order } from './api/orders.api'
import { Button } from '../ui/button'
import { Copy } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const OrdersAdapter = (props:Item) => {
  return (
    <TableRow className='py-2'>
        <TableCell className="font-medium w-[100px]">{String(props.id).length>10?String(props.id).substring(0,10)+"...":props.id}
          <Button size={'sm'} variant='secondary'
          onClick={() => {
            navigator.clipboard.writeText(props.id)
            toast({
              title: 'Copied',
              description: 'Order ID copied to clipboard',
            })
          }}
          >
            <Copy size={12} /> Copy
          </Button>
        </TableCell>
              <TableCell className='flex gap-2 items-center'><img src={props.size.product.imageUrl[0]} className='h-[50px] w-[100px] object-cover rounded-md'/> 
              <div>
                <p className='font-bold'>{props.size.product.name}</p>
                <p className='mt-1'>Size: <span className='bg-primary-foreground text-primary py-1 px-2 rounded-md text-xs'>{props.size.name}</span> </p>
              </div>
              </TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>
              <span className='bg-primary-foreground text-primary py-1 px-2 rounded-md text-xs italic'>{props.deliveryStatus.toLowerCase().replace("_"," ")}</span>
              </TableCell>
              <TableCell>{props.paymentStatus}</TableCell>
              <TableCell>{props.size.product.price} BDT</TableCell>
              <TableCell className="text-right">.00</TableCell>
    </TableRow>
  )
}

export default OrdersAdapter