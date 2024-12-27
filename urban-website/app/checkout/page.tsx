import AlreadyLoggedIn from '@/components/checkout/already-loggedin'
import CheckoutForm from '@/components/checkout/checkout-form'
import CheckoutProducts from '@/components/checkout/checkout-products'
import DeliveryDetails from '@/components/checkout/delivery-details'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import { Button } from '@/components/ui/button'
import React from 'react'

const CheckoutPage = () => {
  return (
    <>
    <Navbar/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-3 md:px-20 py-10">
        <div className="">
            <p className='font-bold text-xl'>Checkout Form</p>
            {/* <AlreadyLoggedIn/> */}
            <CheckoutForm/>
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