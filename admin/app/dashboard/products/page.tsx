"use client"
import ProductTable from '@/components/products/product-table'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const ProductsPage = () => {
  const [query, setquery] = useState<string>('')
  return (
    <div className='p-3 md:p-5'>
        <div className="flex items-center justify-end">
            <div>
            <Input type="text" placeholder="Search" value={query} onChange={e=> setquery(e.target.value)} />
            </div>
        </div>
        <ProductTable query={query}/>
    </div>
  )
}

export default ProductsPage