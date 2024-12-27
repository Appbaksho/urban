import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'

const UserOrderAdapter = () => {
  return (
    <TableRow className='py-3'>
              <TableCell>#c8s8d8</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                    <img src="https://via.placeholder.com/150" alt="product" className="w-12 h-12 rounded-md"/>
                  <div>
                    <div className='font-medium'>Product Name</div>
                    <div className="text-xs text-gray-400">Product Description</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>Cash On Delivery</TableCell>
              <TableCell>
                <Badge className='italic font-normal bg-gray-200' variant="outline">Received</Badge>
              </TableCell>
              <TableCell className="text-right">20.00$</TableCell>
    </TableRow>
  )
}

export default UserOrderAdapter