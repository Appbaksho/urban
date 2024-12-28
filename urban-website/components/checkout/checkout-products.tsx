import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import CheckoutProduct from './checkout-product'

const CheckoutProducts = () => {
  return (
    <div>
      <p className='font-bold text-xl'>Selected Products</p>
      <Card className='mt-3'>
        <CardContent className='py-5'>
          <CardDescription className='text-xs'>Scroll Down if you cannot see all products</CardDescription>
          <ScrollArea className="h-[200px] w-full p-1">
            {
              Array.from({length: 10}).map((_, i) => (
                <CheckoutProduct key={i}/>
              ))
            }
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default CheckoutProducts