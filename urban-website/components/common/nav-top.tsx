
import Link from 'next/link'
import React from 'react'
const NavbarTop = () => {
  return (
    <div className='hidden bg-secondary md:px-20 px-5 py-2 md:flex items-center justify-between text-xs'>
        <p></p>
        <ul className='flex items-center gap-2 [&>li>a]:text-xs [&>li>a]:font-semibold [&>li>a]:transition-all [&>li>a]:ease-in-out [&>li>a]:duration-150 hover:[&>li>a]:opacity-60'>
            
            <li className='pl-2'>
                <Link href="/auth/login">
                    Sign In
                </Link>
                
            </li>
            <li className='border-l border-primary/30 pl-2'>
                <Link href="/auth/register">
                    Register
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default NavbarTop