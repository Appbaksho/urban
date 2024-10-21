
import LoginContainer from '@/components/auth/login/login-container'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <Navbar/>
      <LoginContainer/>
      <Footer/>
    </div>
  )
}

export default LoginPage