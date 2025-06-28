import Link from 'next/link'
import React from 'react'

const TopAnnounce = () => {
  return (
    <div className='bg-secondary py-3 flex flex-col items-center justify-center'>
        <p className="text-center text-sm font-medium">Shop All New Arrivals</p>
        <Link href="/product" className="text-center text-xs transition-opacity ease-in-out duration-150 hover:opacity-50 font-medium underline mt-1">Shop</Link>
    </div>
  )
}

export default TopAnnounce