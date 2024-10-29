import React from 'react'
import image from '@/public/1.jpg'
import Image from 'next/image'
import RegisterForm from './register-form'
const RegisterContainer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <Image src={image} placeholder='blur' height={800} width={700} alt='Urban' className='min-h-[80vh] object-cover md:block hidden'/>
      <div className="flex items-center justify-center py-10 md:py-0">
        <RegisterForm/>
      </div>
    </div>
  )
}

export default RegisterContainer