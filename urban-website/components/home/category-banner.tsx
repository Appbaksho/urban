import Image from 'next/image'
import React from 'react'

import Link from 'next/link'

export interface Category {
    src: string
    url:string
    name:string
}

const CategoryBanner = (props:Category) => {
  return (
    <Link href={props.url}>
        <Image src={props.src} height={400} width={300} alt={`${props.name} | Urban`} className='w-full h-[400px] object-cover'/>
        <p className="pl-2 text-xl font-semibold mt-3">{props.name}</p>
    </Link>
  )
}

export default CategoryBanner