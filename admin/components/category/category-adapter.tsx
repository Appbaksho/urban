import React from 'react'
import { Category } from './api/category.model'
import { TableCell, TableRow } from '../ui/table'
import { Edit2, Table, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'



const CategoryAdapter = (props:Category) => {
  return (
    <TableRow>
              <TableCell>
                <img src={props.imageUrl} className='w-[100px] h-[50px] rounded-md object-cover'/>
              </TableCell>
              <TableCell>{props.name}</TableCell>
              <TableCell>{String(props.description).substring(0,20)}...</TableCell>
              <TableCell>{String(props.parentCategoryId)}</TableCell>
              <TableCell className="flex items-center justify-end gap-2">
                <Button size="icon" variant="outline">
                    <Edit2 size={15}/>
                </Button>
                <Button size="icon" variant="destructive">
                    <Trash2 size={15}/>
                </Button>
              </TableCell>
    </TableRow>
  )
}

export default CategoryAdapter