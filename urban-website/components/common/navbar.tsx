"use client"
import React, { useEffect, useState } from 'react'
import NavbarTop from './nav-top'
import BaseNavbar from './base-navbar'
import TopAnnounce from './top-announce'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'
import CartProduct from '../cart/cart-product'

const Navbar = () => {
    const [bottomvisible, setbottomvisible] = useState<boolean>(false)
    const [searchOpen, setsearchOpen] = useState<boolean>(false)
    // const [searchQuery, setsearchQuery] = useState<string>('')
    const [cartOpen, setcartOpen] = useState<boolean>(false) 
    
    useEffect(() => {
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
    
    
  return (
    <React.Fragment>
        <NavbarTop/>
        <BaseNavbar sheet={cartOpen} setSheet={setcartOpen} open={searchOpen} setOpen={setsearchOpen}/>
        <TopAnnounce/>
        <div className={`transition-all ease-in-out duration-200 fixed w-full left-0 right-0 ${bottomvisible?"opacity-100 top-0":"-top-[200px] opacity-0"}  z-50`}>
            <BaseNavbar sheet={cartOpen} setSheet={setcartOpen} open={searchOpen} setOpen={setsearchOpen}/>
        </div>
        <Dialog open={searchOpen} onOpenChange={e=> setsearchOpen(e)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
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
                {Array(50).fill("_").map((v,i)=><SheetDescription key={i} className='border-b py-3'>
                  <CartProduct/>
                </SheetDescription>)}
              </ScrollArea>
              <div className="flex items-center justify-between px-5 py-3 border-t">
                <SheetDescription className='font-semibold'>Total</SheetDescription>
                <SheetDescription className='font-semibold'>$190</SheetDescription>
              </div>
              <SheetFooter className='flex items-center justify-between gap-1'>
                <Button className='flex-1'>Checkout</Button>
              </SheetFooter>
            </SheetHeader>
          </SheetContent>
          
        </Sheet>
    </React.Fragment>
  )
}

export default Navbar