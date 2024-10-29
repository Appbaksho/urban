import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const CategoryContainer = () => {
  return (
    <div className="w-full h-[300px] relative">
        <Image src="/1.jpg" height={200} width={300} alt='Urban' className='w-full object-cover absolute top-0 left-0 right-0 bottom-0 h-full'/>
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full p-5 flex items-end">
            <Button className='rounded-full' variant="secondary">Air Max</Button>
        </div>
    </div>
  )
}

export default CategoryContainer