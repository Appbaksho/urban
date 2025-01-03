import CheckoutProduct from '@/components/checkout/checkout-product'
import CheckoutProducts from '@/components/checkout/checkout-products'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const ProductInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ordered Items</CardTitle>
      </CardHeader>
      <CardContent>
        {
            // Array.from({length: 3}).map((_, i) => (
            //     <CheckoutProduct key={i}/>
            // ))

        }
      </CardContent>
      <CardFooter className='bg-primary rounded-b-md py-2 flex items-center justify-between'>
        <p className="text-sm text-white font-semibold">Total</p>
        <p className="text-sm text-right text-white font-semibold">1900 BDT</p>
      </CardFooter>
    </Card>
  )
}

export default ProductInfo