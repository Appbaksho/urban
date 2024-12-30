import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import Image from 'next/image'
import { Product } from './api/products.model'
import dayjs from 'dayjs'
import { Button } from '../ui/button'
import { Edit2, Trash2 } from 'lucide-react'


const ProductTableAdapter = (props:Product) => {
  return (
    <TableRow>
          <TableCell>
            <img src={props.imageUrl[0]} className='h-[50px] w-[100px] object-cover rounded-md'/>
          </TableCell>
          <TableCell>
            <p className="font-medium">{props.name}</p>
            <p className="text-xs">{String(props.description).substring(0,20)}...</p>
          </TableCell>
          <TableCell>{props.price} BDT</TableCell>
          <TableCell>{props.discountPrice?props.discountPrice+" BDT":'N/A'}</TableCell>
          <TableCell>{dayjs(props.createdAt).format("DD-MM-YY hh:mm A")}</TableCell>
          <TableCell className="flex items-center justify-end gap-2">
            <Button size="icon" variant="outline">
              <Edit2 size={13}/>
            </Button>
            <Button size="icon" variant="destructive">
              <Trash2 size={13}/>
            </Button>
          </TableCell>
    </TableRow>
  )
}

export default ProductTableAdapter