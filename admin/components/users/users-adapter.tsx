import React from 'react'
import { TableCell, TableRow } from '../ui/table'


//   name             String
//   email            String
//   shippingAddress  String?
//   city             String?
//   zipCode          String?
//   contactNumbers   String[]
//   createdAt        DateTime                     @default(now())

const UsersAdapter = () => {
  return (  
    <TableRow>
    <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Zip Code</TableCell>
          <TableCell className="text-right">Joined</TableCell>
    </TableRow>
  )
}

export default UsersAdapter