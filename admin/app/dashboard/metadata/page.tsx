"use client"
import { useGetMetadataQuery } from '@/components/metadata/api/metadata.api'
import BannerContainer from '@/components/metadata/banner-container'
import DeliveryCharges from '@/components/metadata/delivery-charges'
import ParentCategories from '@/components/metadata/parent-categories'
import React from 'react'

const MetadataPage = () => {
    const {data,isLoading,refetch} = useGetMetadataQuery()
  return (
    <div className='p-5 md:p-10'>
        {isLoading ? <p>Loading...</p>:data&&
        <>
        <BannerContainer refetch={refetch} {...data}/>
        <DeliveryCharges refetch={refetch} {...data}/>
        <ParentCategories {...data}/>
        </>}
        
    </div>
  )
}

export default MetadataPage