"use client"
import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import SearchResultBanner from '@/components/search-result/banner'
import SearchResultProducts from '@/components/search-result/result'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

const SearchPage = () => {
  return (
    <>
    <Navbar/>
    <div className="px-3 md:px-10">
        {/* <Suspense fallback={<p>Loading...</p>}>
          <SearchResultBanner/>
          <SearchResultProducts/>
        </Suspense> */}
    
    </div>
    <Footer/>
    </>
  )
}

export default SearchPage