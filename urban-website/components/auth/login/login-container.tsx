import Image from 'next/image'
import React from 'react'
import image from '@/public/1.jpg'
import LoginForm from './login-form'
const LoginContainer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <Image src={image} placeholder='blur' height={800} width={700} alt='Urban' className='h-[80vh] object-cover md:block hidden'/>
      <div className="flex items-center justify-center py-10 md:py-0">
        <LoginForm/>
      </div>
    </div>
  )
}

export default LoginContainer