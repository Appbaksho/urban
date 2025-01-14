"use client"
import { useGetSingleCategoryQuery } from '@/api/category/category.api'
import CategoryBanner from '@/components/category/banner'
import CategoryContainer from '@/components/category/category-container'
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import { useToast } from '@/hooks/use-toast'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const CategoryPage = () => {
  const params = useParams()
  const {data:category,isLoading,isSuccess,isError,error} = useGetSingleCategoryQuery(String(params.catid))
  const {toast} = useToast()

  // useEffect(() => {
  //   if(isError){
  //     toast({
  //       title:"Error",
  //       description:"Failed to load category",
  //       variant:"destructive"
  //     })
  //   }
  // }, [isError,error])
  useEffect(() => {
    console.log("category",category)
  }, [isSuccess])
  
  


  return (
    <>
    <Navbar/>
    {/* <CategoryBanner name={String(category?.name)} src={String(category?.imageUrl)}/>
    <CategoryContainer categoryId={String(params.catid)}/> */}
    <Footer/>
    </>
  )
}

export default CategoryPage