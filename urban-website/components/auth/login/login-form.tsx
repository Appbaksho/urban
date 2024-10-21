"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import GoogleIcon from './google-icon'

const LoginForm = () => {
    const [showPass, setshowPass] = useState<boolean>(false)
    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
  return (
    <div className="w-[350px]">
      <CardHeader>
        <CardTitle className='font-bold text-xl'>Login</CardTitle>
        <CardDescription className='text-xs'>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">E-mail</Label>
              <Input id="name" placeholder="johndoe@example.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
            <Input placeholder='Password' type={showPass?"text":"password"} />
            </div>
            <div className="flex items-center gap-1">
                <Checkbox id="showPass" onCheckedChange={()=> setshowPass(p=>!p)}/>
                <Label htmlFor="showPass">Show Password</Label>
            </div>
            <div className="flex justify-end">
                <Button type='submit'><Loader2 size={15} className='animate-spin mr-1'/> Login</Button>
            </div>
          </div>
        </form>
        
        <p className="text-center text-xs mt-5">Other Options</p>
        <div className="flex justify-center mt-3">
        <Button variant="outline" onClick={() => console.log('Login with Google')} className='text-xs text-gray-500 rounded-none'>
          <GoogleIcon/>
          <span className="pl-1">
            Login with Google
          </span>
        </Button>
        </div>
      </CardContent>
    </div>
  )
}

export default LoginForm