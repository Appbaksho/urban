"use client"
import CategoryBanner from '@/components/category/banner'
import CategoryContainer from '@/components/category/category-container'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import { useParams } from 'next/navigation'
import React from 'react'

const CategoryPage = () => {
  const params = useParams()

  return (
    <>
    <Navbar/>
    <CategoryBanner name={String(String(params.catid).substring(0,1).toUpperCase()+String(params.catid).substring(1)).replace('-',' ')} src='/products/hoodie-3.png'/>
    <CategoryContainer/>
    <Footer/>
    </>
  )
}

export default CategoryPage