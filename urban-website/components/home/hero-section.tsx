"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import { useGetMetadataQuery } from '../api/metadata/metadata.api'

const HeroSection = () => {
  const {data,isError,error} = useGetMetadataQuery()

  useEffect(() => {
    if(isError){
      console.log(error)
    }
  }, [isError])
  

  return (
    <div className='min-h-[70vh] relative'>
        {data?.bannerUrl&&<Image height={500} width={1200} src={data?.bannerUrl} alt='Urban' className='h-full w-full absolute top-0 left-0 right-0 bottom-0 object-cover'/>}
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-black/50 flex flex-col justify-end p-8 md:p-10">
        <p className="text-4xl xl:text-6xl font-black text-white">{data?.title}</p>
        <p className="text-white text-lg mt-5">
            {data?.description}
        </p>
        <div className="flex mt-5 gap-3">
        <Link href="/category/winter-collection" className={buttonVariants({variant:'secondary',className:'rounded-full'})}>Explore</Link>
        <Link href="/product" className={buttonVariants({variant:'default',className:'rounded-full'})}>All Products</Link>
        </div>
        
        </div>
    </div>
  )
}

export default HeroSection