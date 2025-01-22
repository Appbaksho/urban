"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const SinglePage = () => {
    const nav = useRouter()
    nav.push('/dashboard/orders')
  return (
    <div>Redirecting...</div>
  )
}

export default SinglePage