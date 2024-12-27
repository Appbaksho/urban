import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'

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
                <div key={i} className='flex items-center justify-between py-2'>
                  <div className='flex items-center space-x-2'>
                    <img src="https://via.placeholder.com/150" alt="product" className='w-16 h-16 object-cover'/>
                    <div>
                      <p className='font-semibold'>Product Name</p>
                      <p className='text-xs'>Quantity: 1</p>
                    </div>
                  </div>
                  <p className='font-semibold'>1900 BDT</p>
                </div>
              ))
            }
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default CheckoutProducts