import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { User } from './api/customer.model'
import dayjs from 'dayjs'


//   name             String
//   email            String
//   shippingAddress  String?
//   city             String?
//   zipCode          String?
//   contactNumbers   String[]
//   createdAt        DateTime                     @default(now())

const UsersAdapter = (props:User) => {
  return (  
    <TableRow className='py-2'>
    <TableCell className='font-semibold'>{props.name}</TableCell>
          <TableCell>{props.email}</TableCell>
          <TableCell>{props.contactNumbers.toString()}</TableCell>
          <TableCell>{props.shippingAddress}</TableCell>
          <TableCell>{props.city}</TableCell>
          <TableCell>{props.zipCode}</TableCell>
          <TableCell className="text-right">{dayjs(props.createdAt).format("DD/MM/YY hh:mm A")}</TableCell>
    </TableRow>
  )
}

export default UsersAdapter