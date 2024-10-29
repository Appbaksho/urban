import React from 'react'
import image from '@/public/1.jpg'
import Image from 'next/image'
import RegisterForm from './register-form'
const RegisterContainer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
      <Image src={image} placeholder='blur' height={800} width={700} alt='Urban' className='min-h-[60vh] object-cover md:block hidden'/>
      <div className="flex justify-center py-10 md:py-0 md:col-span-2 p-3">
        <RegisterForm/>
      </div>
    </div>
  )
}

export default RegisterContainer