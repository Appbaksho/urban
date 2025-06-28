import React from 'react'
import cons from '@/public/cons.png'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Facebook, FacebookIcon } from 'lucide-react'
const UnderConstructionPage = () => {
  return (
    <div className="fixed flex-col z-50 flex items-center justify-center bg-white top-0 left-0 right-0 bottom-0 h-screen w-screen">
      <Image src={cons} height={300} width={300} className='w-[300px] h-auto' alt=''/>
      <p className='text-center font-bold text-4xl mt-10'>Coming Soon...</p>
      <Link href='https://www.facebook.com/profile.php?id=61571611291078&mibextid=ZbWKwL' className={buttonVariants({className:'mt-5'})}>
        <FacebookIcon stroke='0' fill='white' size={16} className='mr-2' /> Facebook
      </Link>
    </div>
  )
}

export default UnderConstructionPage