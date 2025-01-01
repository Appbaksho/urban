"use client"
import { useCreateUserMutation } from '@/api/auth/auth.api'
import { useAddManyToCartMutation, useCheckoutProductMutation } from '@/api/cart/cart.api'
import AlreadyLoggedIn from '@/components/checkout/already-loggedin'
import CheckoutForm from '@/components/checkout/checkout-form'
import CheckoutProducts from '@/components/checkout/checkout-products'
import DeliveryDetails from '@/components/checkout/delivery-details'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import { Button } from '@/components/ui/button'
import { auth } from '@/firebase/firebase'
import { useToast } from '@/hooks/use-toast'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export interface ShippingFormData {
  name: string;       // Full name of the user
  email: string;      // Email address of the user
  phone: string;      // Phone number of the user
  address: string;    // Shipping address of the user
  city: string;       // City of the shipping address
  zip: string;        // Zip code of the shipping address
  password:string
  confirmPassword:string,
}



const CheckoutPage = () => {
  const [checkoutFormData, setcheckoutFormData] = useState<ShippingFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    password:'',
    confirmPassword:'',
    city: '',
    zip: ''
  })
  const [addManyToCart, {data, error, isLoading:addingCartLoading, isSuccess, isError}] = useAddManyToCartMutation()
  const [createCustomer, {data:customerData, error:customerError, isLoading:creatingCustomerLoading, isSuccess:customerSuccess, isError:customerIsError}] = useCreateUserMutation()
  const [checkOutProductServer,{data:checkoutData,isLoading:checkoutLoading,isSuccess:checkoutSuccess,isError:checkoutError}] = useCheckoutProductMutation()
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const router = useRouter()
  const {toast} = useToast()
  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setisLoggedIn(true)
    } else {
      setisLoggedIn(false)
    }
  })
  }, [])



  useEffect(() => {
    if(checkoutError){
      toast({
        title:'Error',
        description:'Cannot do checkout right now',
        variant:'destructive'
      })
      console.log(checkoutError)
    }
    if(checkoutSuccess){
      toast({
        title:'Success',
        description:'Checkout successful'
      })
      localStorage.clear()
      router.push('/user/orders')
    }
  }, [checkoutError,checkoutSuccess])


  useEffect(() => {
    if(isError){
      toast({
        title:'Error',
        description:'Cannot do checkout right now',
        variant:'destructive'
      })
      console.log(error)
    }
    if(isSuccess){
      onAuthStateChanged(auth, (user) => {
        user?.getIdToken().then((token)=>{
          checkOutProductServer(token)
        }).catch((e)=>{
          console.log(e)
        })
      })
      console.log('success',data)
      // localStorage.clear() 
    }
  }, [isError,isSuccess])
  

  useEffect(() => {
    if(customerIsError){
      toast({
        title:'Error',
        description:'Cannot create user',
        variant:'destructive'
      })
      console.log(customerError)
    }
    if(customerSuccess){
      addManyToCart(JSON.parse(localStorage.getItem('cart')||'[]'))
    }
  }
  , [customerIsError,customerSuccess])


  const checkOutProducts = () => {
    //form validation 
    if(!isLoggedIn){
      if(checkoutFormData.name===''){
        toast({
          title:'Error',
          description:'Name is required',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.email===''){
        toast({
          title:'Error',
          description:'Email is required',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.phone===''){
        toast({
          title:'Error',
          description:'Phone is required',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.address===''){
        toast({
          title:'Error',
          description:'Address is required',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.city===''){
        toast({
          title:'Error',
          description:'City is required',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.zip===''){
        toast({
          title:'Error',
          description:'Zip is required',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.password===''){
        toast({
          title:'Error',
          description:'Password is required',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.password.length<6){
        toast({
          title:'Error',
          description:'Password must be atleast 6 characters',
          variant:'destructive'
        })
        return
      }
      else if(!checkoutFormData.email.includes('@')){
        toast({
          title:'Error',
          description:'Invalid email',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.phone.length<11){
        toast({
          title:'Error',
          description:'Invalid phone number',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.zip.length<4){
        toast({
          title:'Error',
          description:'Invalid zip code',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.city.length<3){
        toast({
          title:'Error',
          description:'Invalid city name',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.address.length<10){
        toast({
          title:'Error',
          description:'Invalid address',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.name.length<3){
        toast({
          title:'Error',
          description:'Invalid name',
          variant:'destructive'
        })
        return
      }
      else if(checkoutFormData.password!==checkoutFormData.confirmPassword){
        toast({
          title:'Error',
          description:'Password do not match',
          variant:'destructive'
        })
        return
      }
      else{
        //send data to server
        createUserWithEmailAndPassword(auth,checkoutFormData.email,checkoutFormData.password).then((userCredential)=>{
          // Signed in 
          const user = userCredential.user;
          toast({
            title:'Success',
            description:'User created successfully'
          })
          createCustomer({
            name:checkoutFormData.name,
            contactNumbers:[checkoutFormData.phone],
            shippingAddress:checkoutFormData.address,
            city:checkoutFormData.city,
            zipCode:checkoutFormData.zip,
            photoUrl:'#',
          })

        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast({
            title:'Error',
            description:errorMessage,
            variant:'destructive'
          })
        });
      }
    }
  
  }

  return (
    <>
    <Navbar/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-3 md:px-20 py-10">
        <div className="">
            <p className='font-bold text-xl'>Billing Details</p>
            {isLoggedIn ? <AlreadyLoggedIn uid={String(auth.currentUser?.uid)}/> : <CheckoutForm changeData={setcheckoutFormData} data={checkoutFormData}/>}
            
        </div>
        <div>
            <CheckoutProducts/>
            <DeliveryDetails/>
            <div className="flex justify-end mt-3">
                <Button onClick={checkOutProducts}>Place Order</Button>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default CheckoutPage