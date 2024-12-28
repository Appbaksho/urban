import React from 'react'

const CheckoutProduct = () => {
  return (
    <div className='flex items-center justify-between py-2'>
                  <div className='flex items-center space-x-2'>
                    <img src="https://via.placeholder.com/150" alt="product" className='w-16 h-16 object-cover'/>
                    <div>
                      <p className='font-semibold'>Product Name</p>
                      <p className='text-xs'>Quantity: 1</p>
                    </div>
                  </div>
                  <p className='font-semibold'>1900 BDT</p>
                </div>
  )
}

export default CheckoutProduct