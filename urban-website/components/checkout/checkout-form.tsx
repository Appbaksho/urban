import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ShippingFormData } from '@/app/checkout/page'
import { Checkbox } from '../ui/checkbox'

interface CheckoutFormProps {
    data:ShippingFormData
    changeData: React.Dispatch<React.SetStateAction<ShippingFormData>>
}

const CheckoutForm = (props:CheckoutFormProps) => {
    
    const [showPass, setshowPass] = useState<boolean>(false)
  return (
   <Card className='mt-3'>
    <CardContent>
        <CardDescription className='grid md:grid-cols-2 grid-cols-1 gap-5 py-5 [&>div>input]:mt-1'>
        <div>
            <Label htmlFor="name" className='font-semibold text-black'>Full Name</Label>
            <Input type="text" value={props.data.name} onChange={e=> props.changeData(p=>({...p,name:e.target.value}))} name="name" id="name" placeholder="John Doe"/>
        </div>
        <div>
            <Label htmlFor="email" className='font-semibold text-black'>Email</Label>
            <Input type="email" name="email" value={props.data.email}
            onChange={e=> props.changeData(p=>({...p,email:e.target.value}))}
             id="email" placeholder="john@example.com"/>
        </div>
        <div>
            <Label htmlFor="pass" className='font-semibold text-black'>Password</Label>
            <Input type={showPass?"text":"password"} name="pass" value={props.data.password}
            onChange={e=> props.changeData(p=>({...p,password:e.target.value}))}
             id="pass" placeholder="password"/>
{props.data.password!=props.data.confirmPassword&&<p className='text-xs text-red-500'>Password are not same</p>}
        </div>
        <div>
            <Label htmlFor="repass" className='font-semibold text-black'>Retype Password</Label>
            <Input type={showPass?"text":"password"} name="repass" value={props.data.confirmPassword}
            onChange={e=> props.changeData(p=>({...p,confirmPassword:e.target.value}))}
             id="repass" placeholder="retype password"/>
             <div className="flex items-center gap-1 mt-1">
                <Checkbox id='showpass' name='showpass' checked={showPass} onCheckedChange={()=>setshowPass(p=>!p)}/>
                <Label htmlFor="showpass">Show Password</Label>
             </div>
        </div>  
        <div>
            <Label htmlFor="phone" className='font-semibold text-black'>Phone</Label>
            <Input type="tel" name="phone"
            value={props.data.phone}
            onChange={e=> props.changeData(p=>({...p,phone:e.target.value}))}
             id="phone" placeholder="+880xxxxxxx"/>
        </div>
        <div>
            <Label htmlFor="adrress" className='font-semibold text-black'>Shipping Address</Label>
            <Input type="text" name="address"
            value={props.data.address}
            onChange={e=> props.changeData(p=>({...p,address:e.target.value}))}
             id="address" placeholder="Shipping Address"/>
        </div>
        <div>
            <Label htmlFor="city" className='font-semibold text-black'>City</Label>
            <Input type="text" name="city"
            value={props.data.city}
            onChange={e=> props.changeData(p=>({...p,city:e.target.value}))}
             id="city" placeholder="Dhaka"/>
        </div>
        <div>
            <Label htmlFor="zip" className='font-semibold text-black'>Zip</Label>
            <Input type="text" name="zip"
            value={props.data.zip}
            onChange={e=> props.changeData(p=>({...p,zip:e.target.value}))}
             id="zip" placeholder="Zip"/>
        </div>
                
       
        </CardDescription>
    </CardContent>
    </Card>
  )
}

export default CheckoutForm