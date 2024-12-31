import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
// name: string
//   description: string
//   categoryId: string
//   imageUrl: string[]
//   details: string[]
//   sizeDescription: string[]
//   price: number
//   discountPrice: any
//   createdAt: string
//   updatedAt: string
//   continued: boolean
//   sizes: Size[]
const AddProductForm = () => {
  return (
    <Card>
        <CardContent className='pt-3'>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Add Product</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" className="Input" placeholder="Product Name" />
                </div>
                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input type="number" id="price" className="Input" placeholder="Product Price" />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" className="Input" placeholder="Product Description"/>
                </div>
                <div>
                    <Label htmlFor="image">Image</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Input type="file" id="image" className="Input" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="discountPrice">Discount Price</Label>
                    <Input type="number" id="discountPrice" className="Input" placeholder="Discount Price" />
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <select id="category" className="Input">
                        <option value="1">Category 1</option>
                        <option value="2">Category 2</option>
                    </select>
                </div>
                <div>
                    <Label htmlFor="details">Details</Label>
                    <Input type="text" id="details" className="Input" placeholder="Details" />
                </div>
                <div>
                    <Label htmlFor="sizeDescription">Size Description</Label>
                    <Input type="text" id="sizeDescription" className="Input" placeholder="Size Description" />
                </div>
                <div>
                    <Label htmlFor="sizes">Sizes</Label>
                    <Input type="text" id="sizes" className="Input" placeholder="Sizes" />
                </div>
                <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input type="number" id="stock" className="Input" placeholder="Stock" />
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