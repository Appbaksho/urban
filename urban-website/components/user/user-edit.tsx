"use client"
import React, { Dispatch, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { UserPayload } from '@/api/auth/auth.model'
import { useUploadImageMutation } from '@/api/file/file.api'
import { useUpdateUserMutation } from '@/api/customer/customer.api'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

interface DialogProps {
    open: boolean
    onToggle: (e:boolean)=>void
    user:UserPayload
}

const UserEdit = (props:DialogProps) => {
  const [uploadImage,{data:uploadData,isLoading:uploadLoading,isSuccess:uploadSuccess,isError:uploadError}] = useUploadImageMutation()
  const [updateUser, {data:updateData,isLoading:updateLoading,isSuccess:updateSuccess,isError:updateError}] = useUpdateUserMutation()
  const [user, setuser] = useState<UserPayload|null>(null)
  const [photoFile, setphotoFile] = useState<File | null>(null)
  const {toast} = useToast()
  useEffect(() => {
    setuser(props.user)
  }, [props.user])

  useEffect(() => {
    if(uploadSuccess){
      setuser(p=>p!=null?({...p,photoUrl:uploadData?.imageUrl}):null)
    }
  }, [uploadSuccess])

  useEffect(() => {
    if(updateSuccess){
      props.onToggle(false)
      toast({
        title:'Success',
        description:'Profile updated successfully'
      })
    }
  }, [updateSuccess])

  useEffect(() => {
    if(updateError){
      console.log('User update error',updateError)
    }
  }, [updateError])


  const commitChanges = () => {
    onAuthStateChanged(auth, (fireUser) => {
      if (fireUser && user) {
        updateUser({id:fireUser.uid,data:user})
      }
    })
  }


  const updateProfile = async () => {
    if(user && photoFile){
      const form = new FormData()
      form.append('image',photoFile)
      const url = await uploadImage(form)
      if(url){
        setuser(p=>p!=null?({...p,photoUrl:url.data?.imageUrl}):null)
        commitChanges()
      }
      else{
        console.log('Error uploading image')
      }
    }
    else{
      commitChanges()
    }
  }

  return (
   <Dialog open={props.open} onOpenChange={props.onToggle}>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>Edit Profile</DialogTitle>
         <DialogDescription>
           <div className="flex justify-center flex-col items-center">
            <Avatar className='h-[80px] w-[80px]'>
                <AvatarImage src={photoFile?URL.createObjectURL(photoFile):props.user.photoUrl} />
                <AvatarFallback>{props.user.name.substring(0,1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center ">
              <Label className='text-black mt-3'>Change Image</Label>
                <Input type='file' className='mt-2' onChange={e=>{
                  if(e.target.files){
                    setphotoFile(e.target.files[0])
                  }
                }} />
            </div>
            
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 [&>div>label]:hidden">
                <div>
                <Label className="font-medium">Name</Label>
                <Input type="text" placeholder="User Name" value={user?.name} onChange={e=> setuser(p=>p!=null?({...p,name:e.target.value}):null)} />
                </div>
                <div>
                <Label className="font-medium">Phone</Label>
                <Input type="tel" placeholder="+880xxxxx"
                value={user?.contactNumbers[0]} onChange={e=> setuser(p=>p!=null?({...p,contactNumbers:[e.target.value]}):null)}
                />
                </div>
                <div>
                <Label className="font-medium">Shipping Address</Label>
                <Input type="text" placeholder="Address"
                value={user?.shippingAddress} onChange={e=> setuser(p=>p!=null?({...p,shippingAddress:e.target.value}):null)}
                />
                </div>

                <div>
                <Label className="font-medium">City</Label>
                <Input type="text" placeholder="City"
                value={user?.city} onChange={e=> setuser(p=>p!=null?({...p,city:e.target.value}):null)}
                />
                </div>

                <div>
                <Label className="font-medium">Zip</Label>
                <Input type="text" 
                value={user?.zipCode} onChange={e=> setuser(p=>p!=null?({...p,zipCode:e.target.value}):null)}
                />
                </div>

           </div>
           <div className="flex justify-end">
            <Button onClick={updateProfile} size="sm" disabled={uploadLoading||updateLoading}>{(uploadLoading||updateLoading)&&<Loader2 size={13} className='animate-spin mr-1'/>}Save</Button>
           </div>
         </DialogDescription>
       </DialogHeader>
     </DialogContent>
   </Dialog>
  )
}

export default UserEdit