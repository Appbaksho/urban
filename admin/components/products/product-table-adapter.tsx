"use client"
import React, { useState } from 'react'
import { TableCell, TableRow } from '../ui/table'
import Image from 'next/image'
import { Product } from './api/products.model'
import dayjs from 'dayjs'
import { Button } from '../ui/button'
import { Edit2, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import EditProductDialog from './edit-product-dialog'


const ProductTableAdapter = (props:Product) => {
  const [editOpen, seteditOpen] = useState<boolean>(false)
  const [deleteOpen, setdeleteOpen] = useState<boolean>(false)
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
            <Button size="icon" variant="outline" onClick={()=>seteditOpen(true)}>
              <Edit2 size={13}/>
            </Button>
            <Button size="icon" variant="destructive" onClick={()=>setdeleteOpen(true)}>
              <Trash2 size={13}/>
            </Button>
          </TableCell>  
          <Dialog open={deleteOpen} onOpenChange={(e)=>setdeleteOpen(e)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your product
                  and remove the data from our servers.
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={()=>setdeleteOpen(false)}>Cancel</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <EditProductDialog onOpenChange={seteditOpen} open={editOpen} product={props}/>
    </TableRow>
  )
}

export default ProductTableAdapter