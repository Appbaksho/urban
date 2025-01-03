import { Item } from '@/api/cart/cart.model'
import CheckoutProduct from '@/components/checkout/checkout-product'
import CheckoutProducts from '@/components/checkout/checkout-products'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'

interface ProductInfoProps {
  items: Item[]
  deliveryCharge: number
}

const ProductInfo = (props:ProductInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ordered Items</CardTitle>
      </CardHeader>
      <CardContent>
       {props.items.map(item => (
            <CheckoutProduct key={item.id} {...item}/>
          ))}
      </CardContent>
      <CardFooter className='flex flex-col p-0'>
        <div className='py-2 px-5 mt-5 flex items-center justify-between w-full'>
          <p className="text-sm font-semibold">Delivery Charge</p>
          <p className="text-sm text-right font-semibold">{props.deliveryCharge} BDT</p>
        </div>
        <div className='bg-primary rounded-b-md py-2 px-5 flex items-center justify-between w-full'>
          <p className="text-sm text-white font-semibold">Total</p>
          <p className="text-sm text-right text-white font-semibold">{Number(props.items.reduce((acc, item) => acc + item.size.product.price * item.quantity, 0)+Number(props.deliveryCharge)).toFixed(2)} BDT</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductInfo