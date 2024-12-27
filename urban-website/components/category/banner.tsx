import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import Image from 'next/image'

interface Category {
    src: string
    name:string
}
const CategoryBanner = (props:Category) => {
  return (
    <div className='h-[400px] w-full relative overflow-hidden'>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center flex-col">
            <h1 className='text-3xl md:text-4xl font-extrabold text-white'>{props.name}</h1>
            <Breadcrumb className='mt-10'>
              <BreadcrumbList className='text-white'> 
                <BreadcrumbItem>
                  <BreadcrumbLink className='hover:text-gray-200' href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className='hover:text-gray-200' href="#">Categories</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className='text-white'>{props.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        
            <Image src={props.src} height={400} width={300} alt={`${props.name} | Urban`} className='w-full h-[400px] object-cover'/>
            {/* <p className="pl-2 text-xl font-semibold mt-3">{props.name}</p> */}
        
        </div>
  )
}

export default CategoryBanner