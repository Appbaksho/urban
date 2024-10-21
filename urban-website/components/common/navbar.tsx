"use client"
import React, { useEffect, useState } from 'react'
import NavbarTop from './nav-top'
import BaseNavbar from './base-navbar'
import TopAnnounce from './top-announce'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const Navbar = () => {
    const [bottomvisible, setbottomvisible] = useState<boolean>(false)
    const [searchOpen, setsearchOpen] = useState<boolean>(false)
    const [searchQuery, setsearchQuery] = useState<string>('')
    
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
        <BaseNavbar open={searchOpen} setOpen={setsearchOpen}/>
        <TopAnnounce/>
        <div className={`transition-all ease-in-out duration-200 fixed w-full left-0 right-0 ${bottomvisible?"opacity-100 top-0":"-top-[200px] opacity-0"}  z-50`}>
            <BaseNavbar open={searchOpen} setOpen={setsearchOpen}/>
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
    </React.Fragment>
  )
}

export default Navbar