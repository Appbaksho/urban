import React, { Dispatch } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface DialogProps {
    open: boolean
    onToggle: (e:boolean)=>void
}

const UserEdit = (props:DialogProps) => {
  return (
   <Dialog open={props.open} onOpenChange={props.onToggle}>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>Edit Profile</DialogTitle>
         <DialogDescription>
           <div className="flex justify-center flex-col items-center">
            <Avatar className='h-[80px] w-[80px]'>
                <AvatarImage src="https://github.com/muztahiddurjoy.png" />
                <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <Button size="sm" variant="outline" className='mt-2'>Change Image</Button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                <Label className="font-medium">Name</Label>
                <Input type="text" placeholder="Muztahid Rahman"/>
                </div>
                <div>
                <Label className="font-medium">Email</Label>
                <Input type="email" placeholder="random@gmail.com"/>
                </div>
                <div>
                <Label className="font-medium">Phone</Label>
                <Input type="tel" placeholder="+880xxxxx"/>
                </div>
                <div>
                <Label className="font-medium">Shipping Address</Label>
                <Input type="text" placeholder="Muztahid Rahman"/>
                </div>

                <div>
                <Label className="font-medium">City</Label>
                <Input type="text" placeholder="Dhaka"/>
                </div>

                <div>
                <Label className="font-medium">Zip</Label>
                <Input type="text" placeholder="1207"/>
                </div>

           </div>
           <div className="flex justify-end">
            <Button size="sm">Save</Button>
           </div>
         </DialogDescription>
       </DialogHeader>
     </DialogContent>
   </Dialog>
  )
}

export default UserEdit