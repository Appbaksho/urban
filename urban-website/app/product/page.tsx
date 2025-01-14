import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import AllProducts from '@/components/product-page/all-products'
import React from 'react'

const ProductsPage = () => {
  return (
    <>
    <Navbar/>
    <div className="py-10">
        <p className='text-2xl font-bold md:px-10 mb-5 px-4'>All Products</p>
        {/* <AllProducts/> */}
    </div>
    <Footer/>
    </>
  )
}

export default ProductsPage