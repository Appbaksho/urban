"use client"
import AlreadyLoggedIn from '@/components/checkout/already-loggedin'
import CheckoutForm from '@/components/checkout/checkout-form'
import CheckoutProducts from '@/components/checkout/checkout-products'
import DeliveryDetails from '@/components/checkout/delivery-details'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import { Button } from '@/components/ui/button'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'

export interface ShippingFormData {
  name: string;       // Full name of the user
  email: string;      // Email address of the user
  phone: string;      // Phone number of the user
  address: string;    // Shipping address of the user
  city: string;       // City of the shipping address
  zip: string;        // Zip code of the shipping address
  password:string
}



const CheckoutPage = () => {
  const [checkoutFormData, setcheckoutFormData] = useState<ShippingFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    password:'',
    city: '',
    zip: ''
  })
  return (
    <>
    <Navbar/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-3 md:px-20 py-10">
        <div className="">
            <p className='font-bold text-xl'>Billing Details</p>
            {auth.currentUser ? <AlreadyLoggedIn uid={auth.currentUser.uid}/> : <CheckoutForm changeData={setcheckoutFormData} data={checkoutFormData}/>}
            
        </div>
        <div>
            <CheckoutProducts/>
            <DeliveryDetails/>
            <div className="flex justify-end mt-3">
                <Button>Place Order</Button>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default CheckoutPage