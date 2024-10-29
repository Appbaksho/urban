import Image from 'next/image'
import React from 'react'
import { AspectRatio } from '../ui/aspect-ratio'

const ProductCard = () => {
  return (
    <div>
        <div className="w-full mb-5">
          <AspectRatio ratio={4 / 5}>
            <Image width={400} height={400} src="/1.jpg" alt="Image" className="object-cover" />
          </AspectRatio>
        </div>
        <p className="pt-5 font-semibold">Random Product</p>
        <p className="text-gray-500 text-sm">Variant</p>
        <p className="text-sm font-semibold mt-3">$190</p>
    </div>
  )
}

export default ProductCard