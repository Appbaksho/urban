"use client"
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'


const SearchResultBanner = () => {
    const params = useSearchParams()
  return (
    <div>
        <p className='font-medium text-lg'>Search Result For: <span className='font-bold'>{params.get('query')}</span></p>
    </div>
  )
}

export default SearchResultBanner