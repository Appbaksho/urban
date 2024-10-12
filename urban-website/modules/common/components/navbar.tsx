"use client"
import React, { useEffect, useState } from 'react'
import NavbarTop from './nav-top'
import BaseNavbar from './base-navbar'
import TopAnnounce from './top-announce'

const Navbar = () => {
    const [bottomvisible, setbottomvisible] = useState<boolean>(false)
    
    
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
        <BaseNavbar/>
        <TopAnnounce/>
        <div className={`transition-all ease-in-out duration-200 fixed w-full left-0 right-0 ${bottomvisible?"opacity-100 top-0":"-top-[200px] opacity-0"}  z-50`}>
            <BaseNavbar/>
        </div>
    </React.Fragment>
  )
}

export default Navbar