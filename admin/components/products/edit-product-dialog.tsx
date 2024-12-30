"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Product, Size } from './api/products.model'
import { useGetCategoriesQuery, useGetSingleCategoryQuery } from '../category/api/category.api'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'

interface EditProductDialogProps {
  open: boolean
  onOpenChange: (open:boolean)=>void    
  product:Product
}


//   name: string
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


const EditProductDialog = (props:EditProductDialogProps) => {
    const {data:categories,isError,error} = useGetCategoriesQuery()
    const [images, setimages] = useState<string[]>(props.product.imageUrl)
    const [selectedCategory, setselectedCategory] = useState<string>(props.product.categoryId)
    const [details, setdetails] = useState<string[]>(props.product.details)
    const [sizeDescription, setsizeDescription] = useState<string[]>(props.product.sizeDescription)
    const [price, setprice] = useState<number>(props.product.price)
    const [discountPrice, setdiscountPrice] = useState<null|string>(props.product.discountPrice)
    const [sizes, setsizes] = useState<Size[]>(props.product.sizes)
    const [name, setname] = useState<string>(props.product.name)
    const [description, setdescription] = useState<string>(props.product.description)
    
    useEffect(() => {
      if(isError){
            console.log(error)
        }
    }, [isError,error])
    
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                    <Label>Images</Label>
                   <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-1">
                     {images.map((image,i)=>(
                        <Card key={i} className='relative'>
                          <CardContent>
                             <img src={image} className="w-full h-full object-cover absolute top-0 left-0 bottom-0 right-0 rounded-md"/>
                          </CardContent>
                          <CardDescription className='flex justify-end absolute top-0 right-0 p-2'>
                            <Button size="sm" variant="destructive" onClick={()=>{
                                const newImages = images.filter((_,index)=>index!==i)
                                setimages(newImages)
                            }}><Trash2 size={13}/></Button>
                          </CardDescription>
                        </Card>
                     ))}
                   <Card>
                     <CardHeader>
                       <CardTitle>Add Image</CardTitle>
                       <CardDescription>
                        <Button size="sm">Add</Button>
                       </CardDescription>
                     </CardHeader>
                   </Card>
                   </div> 
                   
                    
                    
                </div>
                <div>
                    <Label>Name</Label>
                    <Input value={name} onChange={(e)=>setname(e.target.value)} />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input value={description} onChange={(e)=>setdescription(e.target.value)} />
                </div>
                <div>
                    <Label>Category</Label>
                    <Select value={selectedCategory} onValueChange={(e)=>setselectedCategory(e)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map(category=>(
                          <SelectItem key={category.id} onClick={()=>setselectedCategory(category.id)} value={category.id}>{category.name}</SelectItem> 
                        ))}
                      </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Images</Label>
                </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditProductDialog