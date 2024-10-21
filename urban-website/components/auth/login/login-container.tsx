import Image from 'next/image'
import React from 'react'
import image from '@/public/1.jpg'
import LoginForm from './login-form'
const LoginContainer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <Image src={image} placeholder='blur' height={800} width={700} alt='Urban' className='h-[80vh] object-cover'/>
      <div className="flex items-center justify-center">
        <LoginForm/>
      </div>
    </div>
  )
}

export default LoginContainer