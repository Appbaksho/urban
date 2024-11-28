import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Category } from './category-banner'
import Link from 'next/link'



const CategoryContainer = (props:Category) => {
  return (
    <Link href={props.url}>
    <div className="w-full h-[300px] relative">
        <Image src={props.src} height={200} width={300} alt={`${props.name} | Urban`} className='w-full object-cover absolute top-0 left-0 right-0 bottom-0 h-full'/>
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full p-5 flex items-end">
            <Button className='rounded-full' variant="secondary">{props.name}</Button>
        </div>
    </div>
    </Link>
  )
}

export default CategoryContainer