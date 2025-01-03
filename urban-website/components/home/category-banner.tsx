import Image from 'next/image'
import React from 'react'

import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'

export interface Category {
  src: string
  url:string
  name:string
}

const CategoryBanner = (props:Category) => {
  return (
    <Link href={props.url} className='h-[50vh] w-full relative overflow-hidden'>
      
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center flex-col">
        <h1 className='text-3xl md:text-4xl font-extrabold text-white'>{props.name}</h1>
      </div>
    
        <Image src={props.src} height={400} width={300} alt={`${props.name} | Urban`} className='w-full h-[400px] object-cover'/>
        <p className="pl-2 text-xl font-semibold mt-3 hidden md:block">{props.name}</p>
    
    </Link>
  )
}

export default CategoryBanner