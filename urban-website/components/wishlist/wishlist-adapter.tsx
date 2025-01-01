"use client"
import React, { useState } from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Heart, Loader2, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import Link from 'next/link'
import { Product } from '@/api/products/products.model'
import { Badge } from '../ui/badge'
import { useRemoveWishlistMutation } from '@/api/products/products.api'
import { useToast } from '@/hooks/use-toast'

const WishlistAdapter = (props:Product) => {
    const [removeOpen, setremoveOpen] = useState<boolean>(false)
    const [remove,{isLoading:removeLoading}] = useRemoveWishlistMutation()
    const {toast} = useToast()

    const handleRemove = async ()=>{
        remove(String(props.id)).unwrap().then((v)=>{
          if(props.refetch){
            props.refetch()
          }
          toast({
            title:'Removed',
            description:"Removed from wishlist"
          })
        }).catch((e)=>{
            console.log(e)
            toast({
                title:'Error',
                description:"Cannot remove from wishlist",
                variant:'destructive'
            })
        })
    }

  return (
    <div>
        <div className="w-full mb-5 relative">
            <Image width={400} height={400} src={props.imageUrl[0]} alt="Image" className="object-cover h-[150px] md:h-[200px]" />
          
          <Button onClick={()=> setremoveOpen(p=>!p)} size="icon" variant="outline" className='absolute rounded-md top-2 right-2 h-[30px] w-[30px]'>
            <Trash2 size={17} className='text-red-500'/>
          </Button>
        </div>
        <Link href={`/product/${props.id}`} className="pt-5 mt-5 font-semibold">{props.name}</Link>
        <p className="text-xs mt-1">Available Sizes</p>
        <div className="flex items-center gap-1 mt-2">
          {props.sizes.filter(v=>v.stock>0).map((v)=>{
            return <Badge variant="outline" key={v.id}>{v.name}</Badge>
          })}
        </div>
        <p className="font-bold text-right pr-3 mt-3 mb-3">{props.price} BDT</p>

        <Dialog open={removeOpen} onOpenChange={(e)=> setremoveOpen(e)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                    Are you sure that you want to remove this product from your wishlist?
                    <div className="flex mt-5 items-center justify-end gap-1">
                        <Button size="sm">Cancel</Button>
                        <Button size="sm" variant="destructive" onClick={handleRemove} disabled={removeLoading}>{removeLoading&&<Loader2 size={15} className='animate-spin mr-1'/>} Remove</Button>
                    </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
    </div>
  )
}

export default WishlistAdapter