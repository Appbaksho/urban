import PricingInfo from '@/components/user/order/pricing-info'
import ProductInfo from '@/components/user/order/product-info'
import ProgressInfo from '@/components/user/order/progress-info'
import UserInfo from '@/components/user/order/user-info'
import React from 'react'

const SingleOrderPage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <ProgressInfo/>
      <ProductInfo/>
      <UserInfo/>
    </div>
  )
}

export default SingleOrderPage