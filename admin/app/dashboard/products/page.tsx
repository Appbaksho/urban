
import ProductTable from '@/components/products/product-table'
import { Input } from '@/components/ui/input'
import React from 'react'

const ProductsPage = () => {
  return (
    <div className='p-3 md:p-5'>
        <div className="flex items-center justify-end">
            <div>
            <Input type="text" placeholder="Search" />
            </div>
        </div>
        <ProductTable/>
    </div>
  )
}

export default ProductsPage