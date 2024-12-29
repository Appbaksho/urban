"use client"
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { PropsWithChildren, useEffect } from 'react'

const AuthLayout = ({children}:PropsWithChildren) => {
const router = useRouter()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/user')
      } 
    })
  }, [])
  
  return (
    <>{children}</>
  )
}

export default AuthLayout