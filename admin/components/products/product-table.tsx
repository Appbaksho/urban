import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import ProductTableAdapter from './product-table-adapter'

const ProductTable = () => {
  return (
    <Table>
      <TableCaption>A list of your products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <ProductTableAdapter/>
      </TableBody>
    </Table>
  )
}

export default ProductTable