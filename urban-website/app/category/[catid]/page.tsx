import CategoryBanner from '@/components/category/banner'
import CategoryContainer from '@/components/category/category-container'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import React from 'react'

const CategoryPage = () => {
  return (
    <>
    <Navbar/>
    <CategoryBanner name='Hoodie' src='/products/hoodie-3.png'/>
    <CategoryContainer/>
    <Footer/>
    </>
  )
}

export default CategoryPage