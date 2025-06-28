import React, { Dispatch, SetStateAction } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Edit2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { UserPayload } from '@/components/api/auth/auth.model'
import { auth } from '@/firebase/firebase'

interface UserProfileProps extends UserPayload {
 setEditOpen  : Dispatch<SetStateAction<boolean>>
}

const UserProfile = (props:UserProfileProps) => {
  return (
    <div>
        <Card>
          <CardHeader className='flex items-center flex-row gap-3'>
            <Avatar className='h-[80px] w-[80px]'>
              <AvatarImage src={props.photoUrl} />
              <AvatarFallback>{String(props.name).substring(0,1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
            <CardTitle className='text-2xl'>{props.name} <Button size="icon" onClick={()=> props.setEditOpen(p=>!p)} variant="outline"><Edit2 size={15}/></Button> </CardTitle>
            <CardDescription>{auth.currentUser?.email}</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Table className='px-4 mt-10'>
          
          <TableBody className='text-sm [&>tr]:py-3'>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell className="text-right">{props.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Email</TableCell>
              <TableCell className="text-right">{auth.currentUser?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Phone</TableCell>
              {props.contactNumbers&&<TableCell className="text-right">{String(props.contactNumbers[0])}</TableCell>}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Shipping Address</TableCell>
              <TableCell className="text-right">
                {props.shippingAddress}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">City</TableCell>
              <TableCell className="text-right">{props.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Zip</TableCell>
              <TableCell className="text-right">{props.zipCode}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    </div>
  )
}

export default UserProfile