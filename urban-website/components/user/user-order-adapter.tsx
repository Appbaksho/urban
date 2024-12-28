import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Copy } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

const UserOrderAdapter = () => {
  return (
    <TableRow className='py-3'>
              <TableCell>#c8s8d8 <Button className='text-xs' variant="outline" size="sm"><Copy size={15} className='mr-1'/> Copy</Button> </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                    <img src="https://via.placeholder.com/150" alt="product" className="w-12 h-12 rounded-md"/>
                  <div>
                    <Link href="/user/orders/random" className='font-medium underline'>Product Name</Link>
                    <div className="text-xs text-gray-400">Product Description</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className='hidden md:flex items-center h-full'>
                <p>Cash On Delivery</p></TableCell>
              <TableCell className='text-right md:text-left'>
                <Badge className='italic font-normal bg-gray-200' variant="outline">Received</Badge>
              </TableCell>
              <TableCell className="text-right hidden md:block">2000 BDT</TableCell>
    </TableRow>
  )
}

export default UserOrderAdapter