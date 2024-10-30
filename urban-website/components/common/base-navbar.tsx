import { Heart, Menu, SearchIcon, ShoppingBag, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchContainer from './search-container'

interface BaseNavbarProps {
    open:boolean
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const BaseNavbar = (props:BaseNavbarProps) => {
  return (
    <div className='w-full bg-white px-5 md:px-20 py-3 grid md:grid-cols-5 grid-cols-2'>
        <Image src='/logo.png' width={60} height={30} alt='logo'/>
        <ul className='hidden md:flex items-center justify-center gap-5 text-sm font-semibold hover:[&>li>a]:border-b-2 [&>li>a]:border-b-0 [&>li>a]:border-b-black md:col-span-3 '>
            <li>
                <Link href='/'>
                    New & Featured
                </Link>
            </li>
            <li>
                <Link href='/'>
                    Men
                </Link>
            </li>
            <li>
                <Link href='/'>
                    Women
                </Link>
            </li>
            <li>
                <Link href='/'>
                    Kids
                </Link>
            </li>
        </ul>
        <div className="flex items-center justify-end gap-3">
            <div className="hidden md:flex rounded-full bg-secondary hover:bg-gray-200" onClick={e=> props.setOpen(true)}>
                <div className="rounded-full p-1.5">
                    <SearchIcon size={18}/>
                </div>
                <input type="text" className='focus:outline-0 bg-transparent pr-2 placeholder:font-medium placeholder:text-sm w-[100px]' placeholder='Search' />
            </div>
            <div className="flex items-center gap-2">
                    <Link href="/wishlist" className="rounded-full p-1.5 hover:bg-gray-200">
                        <Heart size={20} strokeWidth={1}/>
                    </Link>
                    <button className="block md:hidden rounded-full p-1.5 hover:bg-gray-200">
                        <User size={20} strokeWidth={1}/>
                    </button>
                    <button className="rounded-full p-1.5 hover:bg-gray-200">
                        <ShoppingBag size={20} strokeWidth={1}/>
                    </button>
                    <button className="block md:hidden rounded-full p-1.5 hover:bg-gray-200">
                        <Menu size={20} strokeWidth={1}/>
                    </button>
            </div>
        </div>
        {/* <SearchContainer/> */}
    </div>
  )
}

export default BaseNavbar