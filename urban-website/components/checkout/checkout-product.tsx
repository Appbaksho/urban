import { Item } from '@/api/cart/cart.model'
import React from 'react'

const CheckoutProduct = (props:Item) => {

  return (
    <div className='flex items-center justify-between py-2'>
                  <div className='flex items-center space-x-2'>
                    <img src={props.size.product.imageUrl[0]} alt="product" className='w-16 h-16 object-cover'/>
                    <div>
                      <p className='font-semibold'>{props.size.product.name}</p>
                      <p className='text-xs'>Quantity: {props.quantity}</p>
                    </div>
                  </div>
                  <p className='font-semibold'>{props.size.product.price} BDT</p>
                </div>
  )
}

export default CheckoutProduct