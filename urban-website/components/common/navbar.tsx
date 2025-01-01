"use client"
import React, { useEffect, useState } from 'react'
import NavbarTop from './nav-top'
import BaseNavbar from './base-navbar'
import TopAnnounce from './top-announce'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet'
import { ScrollArea } from '../ui/scroll-area'
import { Button, buttonVariants } from '../ui/button'
import CartProduct from '../cart/cart-product'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useLazyGetCartQuery } from '@/api/cart/cart.api'
import { Skeleton } from '../ui/skeleton'
import CartProductOffline from '../cart/cart-product-offline'
import { Product } from '@/api/products/products.model'
import { AddToCartPayload, Item } from '@/api/cart/cart.model'

const Navbar = () => {
    const [bottomvisible, setbottomvisible] = useState<boolean>(false)
    const [searchOpen, setsearchOpen] = useState<boolean>(false)
    // const [searchQuery, setsearchQuery] = useState<string>('')
    const [cartOpen, setcartOpen] = useState<boolean>(false) 
    const [loggedIn, setloggedIn] = useState<boolean>(false)
    const [offlineProducts, setofflineProducts] = useState<{price:number,quanity:number,id:string}[]>([])
    const [offlineCartItems, setofflineCartItems] = useState<AddToCartPayload[]>([])
    const [total, settotal] = useState<number>(0)

    const [getCart,{data:cart,isLoading:cartLoading,isSuccess:isCartSuccess,isError:isCartError,error:cartError}] = useLazyGetCartQuery()
  useEffect(() => {
    if(isCartError){
      console.log(cartError)
    }
    if(isCartSuccess){
      settotal(cart?.items.reduce((acc,v)=>acc+v.size.product.price*v.quantity,0))
    }
  }, [isCartError,isCartSuccess])

  const getAuthCart = ()=>{
    auth.currentUser?.getIdToken().then((token)=>{
      getCart(token)
    }).catch((e)=>{
      console.log(e)
    })
  }
  
  
    
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setloggedIn(true)
          getAuthCart()
        } else {
          setloggedIn(false)
        }
        })
        const handleScroll = () => {
            const currentScrollValue = window.scrollY;
            if (currentScrollValue > 200) {
                setbottomvisible(true)
            } else {
                setbottomvisible(false)
            }
        }
    window.addEventListener('scroll', handleScroll);
    
    }, [])

    useEffect(() => {
      if(cartOpen){
        getAuthCart()
        setofflineCartItems(JSON.parse(localStorage.getItem('cart')||'[]'))
      }
    }, [cartOpen])

    useEffect(() => {
      settotal(offlineProducts.reduce((acc,v)=>acc+v.price*v.quanity,0))
    }, [offlineProducts])
    
    
    
    
  return (
    <React.Fragment>
        <NavbarTop isLoggedIn={loggedIn}/>
        <BaseNavbar isLoggedIn={loggedIn} sheet={cartOpen} setSheet={setcartOpen} open={searchOpen} setOpen={setsearchOpen}/>
        <TopAnnounce/>
        <div className={`transition-all ease-in-out duration-200 fixed w-full left-0 right-0 ${bottomvisible?"opacity-100 top-0":"-top-[200px] opacity-0"}  z-50`}>
            <BaseNavbar sheet={cartOpen} isLoggedIn={loggedIn} setSheet={setcartOpen} open={searchOpen} setOpen={setsearchOpen}/>
        </div>
        <Dialog open={searchOpen} onOpenChange={e=> setsearchOpen(e)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search</DialogTitle>
              <DialogDescription>
                Search for your favorite products
                <form className="flex items-center mt-3" method='get' action='/search'>
                  <Input placeholder='Search..' className='border-primary/50' name='query'/>
                  <Button type='submit' size='icon' className='ml-1' onClick={e=> setsearchOpen(false)}>
                    <Search size={17}/>
                  </Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Sheet open={cartOpen} onOpenChange={e=> setcartOpen(e)}>
          <SheetContent className='w-[300px]'>
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
              <SheetDescription>
              </SheetDescription>
              <ScrollArea className='h-[70vh] pr-2'>
                {loggedIn?(cartLoading?Array(5).fill("_").map((_,i)=><SheetDescription key={i} className='border-b py-3'>
                  <Skeleton className='h-[150px] w-full'/>
                </SheetDescription>):cart?.items?.map((v)=><SheetDescription key={v.id} className='border-b py-3'>
                  <CartProduct {...v}/>
                </SheetDescription>)):offlineCartItems.length>0?offlineCartItems.map((v:any,i:number)=><SheetDescription key={i} className='border-b py-3'>
                  <CartProductOffline setCartItems={setofflineCartItems} setOfflineProducts={setofflineProducts} {...v}/>
                </SheetDescription>):<SheetDescription className='border-b py-3'>No items in cart</SheetDescription>}

              </ScrollArea>
              <div className="flex items-center justify-between px-5 py-3 border-t">
                <SheetDescription className='font-semibold'>Total</SheetDescription>
                <SheetDescription className='font-semibold'>{total} BDT</SheetDescription>
              </div>
              <SheetFooter className='flex items-center justify-between gap-1'>
                <Link href="/checkout" className={buttonVariants({class:'flex-1 w-full'})}>Checkout</Link>
              </SheetFooter>
            </SheetHeader>
          </SheetContent>
          
        </Sheet>
    </React.Fragment>
  )
}

export default Navbar