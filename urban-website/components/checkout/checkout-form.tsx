import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

const CheckoutForm = () => {
  return (
   <Card className='mt-3'>
    <CardContent>
        <CardDescription className='grid md:grid-cols-2 grid-cols-1 gap-5 py-5 [&>div>input]:mt-1'>
        <div>
            <Label htmlFor="name" className='font-semibold text-black'>Full Name</Label>
            <Input type="text" name="name" id="name" placeholder="John Doe"/>
        </div>
        <div>
            <Label htmlFor="email" className='font-semibold text-black'>Email</Label>
            <Input type="email" name="email" id="email" placeholder="john@example.com"/>
        </div>
        <div>
            <Label htmlFor="phone" className='font-semibold text-black'>Phone</Label>
            <Input type="tel" name="phone" id="phone" placeholder="+880xxxxxxx"/>
        </div>
        <div>
            <Label htmlFor="adrress" className='font-semibold text-black'>Shipping Address</Label>
            <Input type="text" name="address" id="address" placeholder="Shipping Address"/>
        </div>
        <div>
            <Label htmlFor="city" className='font-semibold text-black'>City</Label>
            <Input type="text" name="city" id="city" placeholder="Dhaka"/>
        </div>
        <div>
            <Label htmlFor="zip" className='font-semibold text-black'>Zip</Label>
            <Input type="text" name="zip" id="zip" placeholder="Zip"/>
        </div>
        <div className="md:col-span-2">
        <Label htmlFor="note" className='font-semibold text-black'>Extra Note</Label>
        <Textarea name="note" id="note" placeholder="Extra Note" className='mt-2'/>
        </div>
       
        </CardDescription>
    </CardContent>
    </Card>
  )
}

export default CheckoutForm