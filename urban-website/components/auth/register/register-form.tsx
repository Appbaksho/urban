"use client"
import { Card} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, MapPin, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { registerSchema, RegistrationSchemaType } from './validator/register.validator'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useToast } from '@/hooks/use-toast'
import { useCreateUserMutation } from '@/components/api/auth/auth.api'
import { useRouter } from 'next/navigation'
const RegisterForm = () => {
    const [showPass, setshowPass] = useState<boolean>(false)
    const {register,formState:{errors},handleSubmit} = useForm<RegistrationSchemaType>({
        resolver: zodResolver(registerSchema)
    })
    const router = useRouter()
    const [createUser,{isLoading,isError,isSuccess}] = useCreateUserMutation()
    const {toast} = useToast()
    const onSubmit = (data: RegistrationSchemaType) => {
        createUserWithEmailAndPassword(auth, data.email, data.password).then(async (userCredential) => {
            createUser({
                contactNumbers: [data.phoneNumber],
                name: `${data.firstName} ${data.lastName}`,
                shippingAddress: data.billingAddress,
                city: data.city,
                zipCode: data.zip
            }).then((res) => {
                console.log(res)
                toast({
                    title: "Success",
                    description: "User Created Successfully",
                })
                router.push('/user')
            }).catch((error) => {
                console.log(error)
                toast({
                    title: "Error",
                    description: "Failed to create user",
                    variant:"destructive"
                })
                router.push('/user')
            })
            
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            toast({
                title: "Error",
                description: errorMessage,
                variant:"destructive"
            })
        });
    }

    useEffect(() => {
      if(isSuccess){
        toast({
            title: "Success",
            description: "User Created Successfully",
        })
        router.push('/user')
      }
        if(isError){
            toast({
                title: "Error",
                description: "Failed to create user",
                variant:"destructive"
            })
        }
    }, [])
    

  return (
    <Card className='w-full px-4 p-5 md:p-10 mt-3 flex flex-col gap-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className="">

                <p className="font-bold mb-2 text-lg flex items-center"><User size={17} className="mr-1"/> Personal Details</p>
                <div className="grid grid-cols-2 gap-2">
                <div className=''>
                    <Label>First Name</Label>
                    <Input placeholder='John' {...register('firstName')}/>
                    <span className="text-xs text-red-500">{errors.firstName?.message}</span>
                </div>  
                <div className=''>
                    <Label>Last Name</Label>
                    <Input placeholder='Doe' {...register('lastName')}/>
                    <span className="text-xs text-red-500">{errors.lastName?.message}</span>
                </div>  
                <div className='col-span-2'>
                    <Label>Phone</Label>
                    <Input placeholder='+880' {...register('phoneNumber')}/>
                    <span className="text-xs text-red-500">{errors.phoneNumber?.message}</span>
                </div>  
                </div>

               
                
            </div>
            <div className=''>

                <p className="font-bold mb-2 text-lg flex items-center"><User size={17} className="mr-1"/> Account Details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className='md:col-span-2'>
                    <Label>Email</Label>
                    <Input type="email" placeholder='user@gmail.com' {...register('email')}/>
                    <span className="text-xs text-red-500">{errors.email?.message}</span>
                </div>  
                <div className=''>
                    <Label>Password</Label>
                    <Input type={showPass?"text":"password"} {...register('password')}/>
                    <span className="text-xs text-red-500">{errors.password?.message}</span>
                </div>  
                <div className=''>
                    <Label>Retype Password</Label>
                    <Input type={showPass?"text":"password"} {...register('confirmPassword')}/>
                    <span className="text-xs text-red-500">{errors.confirmPassword?.message}</span>
                    <div className="flex items-center justify-end mt-2">
                        <Checkbox checked={showPass} id="showPass" onCheckedChange={()=> setshowPass(p=>!p)}/>
                        <Label className="ml-1" htmlFor='showPass'>Show Password</Label>
                    </div>
                </div>  
                </div>

               
                

            </div>
            <div className="md:col-span-2">
                <p className="font-bold mb-2 text-lg flex items-center"><MapPin size={17} className="mr-1"/> Shipping Address</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className='md:col-span-2'>
                    <Label>Street Address</Label>
                    <Input placeholder='1/26, Matikata, ECB, Dhaka' {...register('billingAddress')}/>
                    <span className="text-xs text-red-500">{errors.billingAddress?.message}</span>
                </div>  
                <div className=''>
                    <Label>City</Label>
                    <Input placeholder='Dhaka' {...register('city')}/>
                    <span className="text-xs text-red-500">{errors.city?.message}</span>
                </div>  
                <div className=''>
                    <Label>Zip</Label>
                    <Input placeholder='1207' {...register('zip')}/>
                    <span className="text-xs text-red-500">{errors.zip?.message}</span>
                </div>  
                </div>

               
                
            </div>
        </div>
        <div className="flex items-center justify-end mt-3">
            <Button onClick={handleSubmit(onSubmit)} disabled={isLoading} type='submit'>{isLoading&&<Loader2 className='animate-spin mr-2' size={15}/>} Create</Button>
        </div>
        </Card>
   
  )
}

export default RegisterForm