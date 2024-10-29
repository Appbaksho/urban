import Image from 'next/image'
import React from 'react'
import { AspectRatio } from '../ui/aspect-ratio'

const CategoryBanner = () => {
  return (
    <div>
        <Image src="/1.jpg" height={400} width={300} alt='Urban' className='w-full h-[400px] object-cover'/>
        <p className="text-xl font-semibold mt-3">Category Name</p>
    </div>
  )
}

export default CategoryBanner