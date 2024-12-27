import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Edit2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const UserProfile = () => {
  return (
    <div>
        <Card>
          <CardHeader className='flex items-center flex-row gap-3'>
            <Avatar className='h-[80px] w-[80px]'>
              <AvatarImage src="https://github.com/muztahiddurjoy.png" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div>
            <CardTitle className='text-2xl'>Muztahid Rahman <Button size="icon" variant="outline"><Edit2 size={15}/></Button> </CardTitle>
            <CardDescription>random@gmail.com</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Table className='px-4 mt-10'>
          
          <TableBody className='text-sm [&>tr]:py-3'>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell className="text-right">Muztahid Rahman</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Email</TableCell>
              <TableCell className="text-right">muztahiddurjoy99@gmail.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Phone</TableCell>
              <TableCell className="text-right">01521712242</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Shipping Address</TableCell>
              <TableCell className="text-right">
                Random Addresss
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">City</TableCell>
              <TableCell className="text-right">Dhaka</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Zip</TableCell>
              <TableCell className="text-right">1216</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    </div>
  )
}

export default UserProfile