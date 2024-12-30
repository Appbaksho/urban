import React from 'react'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'
import UsersAdapter from './users-adapter'


const UsersTable = () => {
  return (
    <Table>
      <TableCaption>A list of urban users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Zip Code</TableHead>
          <TableHead className="text-right">Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <UsersAdapter/>
        <UsersAdapter/>
        <UsersAdapter/>
      </TableBody>
    </Table>
  )
}

export default UsersTable