"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import GoogleIcon from './google-icon'
import { auth } from '@/firebase/firebase'
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const [showPass, setshowPass] = useState<boolean>(false)
    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [loading, setloading] = useState<boolean>(false)
    const router = useRouter()

    const loginUser = ()=>{
      setloading(true)
      signInWithEmailAndPassword(auth,email,password).then((user)=>{
        if(user){
          toast({
            title:'Login Success',
            description:'You have successfully logged in',
            className:"bg-green-500 text-white"
          })
          router.push('/profile')
        }
        else{
          toast({
            title:'User not found',
            description:'Cannot find user associated with this credentials',
            variant:'destructive'
          })
        }
      }).catch((err:AuthError)=>{
        toast({
          title:"Auth Error",
          description:err.message,
          variant:'destructive'
        })
      })
      .finally(()=>{
        setloading(false )
      })
    }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className='font-bold text-xl'>Login</CardTitle>
        <CardDescription className='text-xs'>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" value={email} onChange={e=> setemail(e.target.value)} placeholder="johndoe@example.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
            <Input placeholder='Password' id="password" value={password} onChange={e=> setpassword(e.target.value)} type={showPass?"text":"password"} />
            </div>
            <div className="flex items-center gap-1">
                <Checkbox id="showPass" onCheckedChange={()=> setshowPass(p=>!p)}/>
                <Label htmlFor="showPass">Show Password</Label>
            </div>
            <div className="flex justify-end">
                <Button type='submit' onClick={loginUser} disabled={!email||!password||loading}>{loading&&<Loader2 size={15} className='animate-spin mr-1'/>} Login</Button>
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
    </Card>
  )
}

export default LoginForm