import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React from 'react'

const AddProductForm = () => {
  return (
    <Card>
        <CardContent className='pt-3'>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Add Product</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <input type="text" id="name" className="input" placeholder="Product Name" />
                </div>
                <div>
                    <Label htmlFor="price">Price</Label>
                    <input type="number" id="price" className="input" placeholder="Product Price" />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea id="description" className="input" placeholder="Product Description"></textarea>
                </div>
                <div>
                    <Label htmlFor="image">Image</Label>
                    <input type="file" id="image" className="input" />
                </div>
                <div>
                    <button className="btn">Add Product</button>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default AddProductForm