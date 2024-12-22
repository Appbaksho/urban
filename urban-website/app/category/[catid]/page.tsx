import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import CategoryBanner from '@/components/home/category-banner'
import React from 'react'

const CategoryPage = () => {
  return (
    <>
    <Navbar/>
    <CategoryBanner name='Hoodie' src='/products/hoodie-3.png'/>
    <Footer/>
    </>
  )
}

export default CategoryPage