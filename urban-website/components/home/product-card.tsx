import Image from 'next/image'
import React from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Link from 'next/link'
import { Badge } from '../ui/badge'

const ProductCard = () => {
  return (
    <div className='px-2'>
        <div className="w-full mb-5">
          <Link href="/product/random">
            <Image width={400} height={400} src="/1.jpg" alt="Image" className="h-[200px] w-full object-cover rounded-md" />
          </Link>
        </div>
        <div className=''>
        <Link href="/product/random" className="font-semibold">Pookie Hoodie</Link>
        <div className="flex items-center gap-1 mt-2">
        <Badge variant="outline">Men</Badge>
        <Badge variant="outline">Women</Badge>
        </div>

        <p className="font-bold text-right pr-3 mt-3">2000 BDT</p>
        </div>
    </div>
  )
}

export default ProductCard