import React from 'react'
import WishlistAdapter from './wishlist-adapter'

const WishlistContainer = () => {
  return (
    <div className='p-5 md:p-10'>
        <p className='text-xl font-semibold'>Your Wishlist</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
            {Array(10).fill("_").map((v,i)=><WishlistAdapter key={i}/>)}
        </div>
    </div>
  )
}

export default WishlistContainer