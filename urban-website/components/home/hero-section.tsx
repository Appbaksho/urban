import Image from 'next/image'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <div className='min-h-[70vh] relative'>
        <Image height={500} width={1200} src="/1.jpg" alt='Urban' className='h-full w-full absolute top-0 left-0 right-0 bottom-0 object-cover'/>
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-black/50 flex flex-col justify-end p-8 md:p-10">
        <p className="text-4xl xl:text-6xl font-black text-white">Explore Winter Collection.</p>
        <p className="text-white text-lg mt-5">
            Embrace the elements with style.
        </p>
        <div className="flex mt-5 gap-3">
        <Link href="/category/winter-collection" className={buttonVariants({variant:'secondary',className:'rounded-full'})}>Explore</Link>
        <Link href="/product" className={buttonVariants({variant:'default',className:'rounded-full'})}>All Products</Link>
        </div>
        
        </div>
    </div>
  )
}

export default HeroSection