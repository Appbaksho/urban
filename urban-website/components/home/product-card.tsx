import Image from 'next/image'
import React from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import { Product } from '@/api/products/products.model'
import { Skeleton } from '../ui/skeleton'

const ProductCard = (props:Product) => {
  return (
    <Card className='w-full' >
        <div className="w-full mb-5">
          <Link href={`/product/${props.id}`}>
            {props.imageUrl?<Image width={400} height={400} src={props.imageUrl[0]} alt="Image" className="h-[150px] md:h-[200px] w-full object-cover rounded-t-md" />:<Skeleton className='h-[150px] md:h-[200px] w-full rounded-t-lg'/>}
          </Link>
        </div>
        <div className='px-2'>
        <Link href={`/product/${props.id}`} className="font-semibold">{props.name}</Link>
        <div className="flex items-center gap-1 mt-2 [&>div]:text-xs">
        <Badge variant="outline" className='text-[10px]'>Men</Badge>
        <Badge variant="outline">Women</Badge>
        </div>

        <p className="font-bold text-right pr-3 mt-3 mb-3">{props.price} BDT</p>
        </div>
    </Card>
  )
}

export default ProductCard