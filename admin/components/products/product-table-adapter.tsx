import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import Image from 'next/image'



const ProductTableAdapter = () => {
  return (
    <TableRow>
          {/* <TableCell><Image src="/" height={150} width={150} /></TableCell> */}
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">.00</TableCell>
    </TableRow>
  )
}

export default ProductTableAdapter