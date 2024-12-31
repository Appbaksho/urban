"use client"
import { useGetSingleCategoryQuery } from '@/api/category/category.api'
import CategoryBanner from '@/components/category/banner'
import CategoryContainer from '@/components/category/category-container'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import { useParams } from 'next/navigation'
import React from 'react'

const CategoryPage = () => {
  const params = useParams()
  const {data:category,isLoading,isError,error} = useGetSingleCategoryQuery(String(params.catid))

  return (
    <>
    <Navbar/>
    <CategoryBanner name={String(category?.name)} src={String(category?.imageUrl)}/>
    <CategoryContainer/>
    <Footer/>
    </>
  )
}

export default CategoryPage