"use client"
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import SearchResultBanner from '@/components/search-result/banner'
import SearchResultProducts from '@/components/search-result/result'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const SearchPage = () => {
    const params = useSearchParams()
  return (
    <>
    <Navbar/>
    <div className="px-3 md:px-10">
    <SearchResultBanner query={String(params.get('query'))}/>
    <SearchResultProducts/>
    </div>
    <Footer/>
    </>
  )
}

export default SearchPage