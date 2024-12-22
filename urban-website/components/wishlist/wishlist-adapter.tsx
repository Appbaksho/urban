"use client"
import React, { useState } from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import Link from 'next/link'

const WishlistAdapter = () => {
    const [removeOpen, setremoveOpen] = useState<boolean>(false)
  return (
    <div>
        <div className="w-full mb-5 relative">
          <AspectRatio ratio={3 / 4}>
            <Image width={400} height={400} src="/1.jpg" alt="Image" className="object-cover" />
          </AspectRatio>
          
          <Button onClick={()=> setremoveOpen(p=>!p)} size="icon" variant="outline" className='absolute top-2 right-2 h-[30px] w-[30px] rounded-none'>
            <Heart size={17} className='text-red-500'/>
          </Button>
        </div>
        <Link href="/product/random" className="pt-5 mt-5 font-semibold">Random Product</Link>
        <p className="text-gray-500 text-sm">Variant</p>
        <p className="text-sm font-semibold mt-3">$190</p>

        <Dialog open={removeOpen} onOpenChange={(e)=> setremoveOpen(e)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                    Are you sure that you want to remove this product from your wishlist?
                    <div className="flex mt-5 items-center justify-end gap-1">
                        <Button size="sm" className='rounded-full'>Cancel</Button>
                        <Button size="sm" variant="destructive" className='rounded-full'>Remove</Button>
                    </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
    </div>
  )
}

export default WishlistAdapter