import Image from 'next/image'
import React from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'

const ProductCard = () => {
  return (
    <Card className='w-full' >
        <div className="w-full mb-5">
          <Link href="/product/random">
            <Image width={400} height={400} src="/1.jpg" alt="Image" className="h-[150px] md:h-[200px] w-full object-cover rounded-t-md" />
          </Link>
        </div>
        <div className='px-2'>
        <Link href="/product/random" className="font-semibold">Pookie Hoodie</Link>
        <div className="flex items-center gap-1 mt-2 [&>div]:text-xs">
        <Badge variant="outline" className='text-[10px]'>Men</Badge>
        <Badge variant="outline">Women</Badge>
        </div>

        <p className="font-bold text-right pr-3 mt-3 mb-3">2000 BDT</p>
        </div>
    </Card>
  )
}

export default ProductCard