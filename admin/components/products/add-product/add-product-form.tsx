"use client"

import { useGetCategoriesQuery } from '@/components/category/api/category.api'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useAddProductMutation, useUploadImageMutation } from '../api/products.api'
import { Size } from '../api/products.model'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import DetailsAdapter from './details-adapter'
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
    const {data:categories,isError,error} = useGetCategoriesQuery()
    const [createProductMutation,{data:proCreateData, isSuccess:isSuccessCreate, isError:isErrorCreate, error:proCreateError,isLoading}] = useAddProductMutation()
    const [imageUploadMutation,{data:imageData,isError:isImageUploadError,error:imageUploadError,isSuccess:isImageUploadSuccess,isLoading:isImageUploading}] = useUploadImageMutation()

    const [name, setname] = useState<string>('')
    const [price, setprice] = useState<number>(0)
    const [description, setdescription] = useState<string>('')
    const [discountPrice, setdiscountPrice] = useState<null|string>('')
    const [details, setdetails] = useState<string[]>([])
    const [sizeDescription, setsizeDescription] = useState<string[]>([])
    const [sizes, setsizes] = useState<Size[]>([])
    const [category, setcategory] = useState<string>('')
    const [image, setimage] = useState<File[]>([])
    const [images, setimages] = useState<string[]>([])
    const [selectedCategory, setselectedCategory] = useState<string>('')
    const [sizediaOpen, setsizediaOpen] = useState(false)
    const [sizeName, setsizeName] = useState('')
    const [stock, setstock] = useState('')

    const {toast} = useToast()

    
    const handleAddProduct = async () => {
        
        
        try {
            const imageUrls = await Promise.all(image.map(async img=>{
                const formData = new FormData()
                formData.append('image',img)
                const data = await imageUploadMutation(formData)
                return String(data?.data?.imageUrl)
            }))
            const data = await createProductMutation({
                name,
                price,
                description,
                discountPrice,
                details:details,
                sizeDescription,
                sizes,
                imageUrl:imageUrls,
                categoryId:category
            })
            if(data){
                toast({
                    title: 'Success',
                    description: 'Product added successfully',
                })
                setname('')
                setprice(0)
                setdescription('')
                setdiscountPrice('')
                setdetails([])
                setsizeDescription([])
                setsizes([])
                setcategory('')
                setimages([])
                setimage([])
            }
        }
        
        catch (error) {
            toast({
                title: 'Error',
                description: 'Cannot add product',
                variant:'destructive'
            })
        }
    }
  return (
    <Card>
        <CardContent className='pt-3'>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Add Product</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="md:col-span-2">
                    <Label>Images</Label>
                   <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-1">
                     {images.map((image,i)=>(
                        <Card key={i} className='relative h-[120px]'>
                          <CardContent>
                             <img src={image} className="w-full h-[120px] object-cover absolute top-0 left-0 bottom-0 right-0 rounded-md"/>
                          </CardContent>
                          <CardDescription className='flex justify-end absolute top-0 right-0 p-1'>
                            <Button size="sm" variant="destructive" onClick={()=>{
                                const newImages = images.filter((_,index)=>index!==i)
                                setimages(newImages)
                            }}><Trash2 size={13}/></Button>
                          </CardDescription>
                        </Card>
                     ))}
                     {image.map((img,i)=>(
                        <Card key={i} className='relative h-[120px]'>
                          <CardContent>
                             <img src={URL.createObjectURL(img)} className="w-full h-[120px] object-cover absolute top-0 left-0 bottom-0 right-0 rounded-md"/>
                          </CardContent>
                          <CardDescription className='flex justify-end absolute top-0 right-0 p-1'>
                            <Button size="sm" variant="destructive" onClick={()=>{
                                const newImages = image.filter((_,index)=>index!==i)
                                setimage(p=>[...newImages])
                            }}><Trash2 size={13}/></Button>
                          </CardDescription>
                        </Card>
                     ))}
                   <Card>
                     <CardHeader>
                       <CardTitle>Add Image</CardTitle>
                       <CardDescription>
                        <Input type="file" multiple onChange={(e)=>{
                                                    if(!e.target.files) return
                                                    const files = Array.from(e.target.files)
                                                    setimage(p=>[...p,...files])
                                                }} placeholder='Files'/>
                       </CardDescription>
                     </CardHeader>
                   </Card>
                   </div> 
                   
                    
                    
                </div>
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" className="Input" placeholder="Product Name" value={name} onChange={e=> setname(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input type="number" id="price" className="Input" placeholder="Product Price" value={price} onChange={e=> !Number.isNaN(Number(e.target.value))&&setprice(Number(e.target.value))} />
                </div>
                <div className='md:col-span-2'>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" className="Input" placeholder="Product Description" value={description} onChange={e=> setdescription(e.target.value)} rows={10}/>
                </div>
                
                <div>
                    <Label htmlFor="discountPrice">Discount Price</Label>
                    <Input type="number" id="discountPrice" className="Input" placeholder="Discount Price" value={String(discountPrice)} onChange={e=> !Number.isNaN(Number(e.target.value))&&setdiscountPrice(e.target.value)}/>
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={(e)=>setcategory(e)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                            categories?.map(category=>(
                                <SelectItem key={category.id} onClick={()=>setcategory(category.id)} value={category.id}>{category.name}</SelectItem> 
                            ))
                        }
                      </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="details">Details (Comma separated. eg: Wash carefully,Random Spec)</Label>
                    <div>
                    {
                        details.map((detail,i)=>(
                            <DetailsAdapter key={i} name={detail} setName={setdetails}/>
                        ))
                    }
                    </div>
                    <Input type="text" id="details" className="Input" placeholder="Details"
                    value={details.join(',')} onChange={(e)=>setdetails(e.target.value.split(','))}
                     />
                </div>
                <div>
                    <Label htmlFor="sizeDescription">Size Description (Comma separated. eg: M: 20",S: 10")</Label>
                    <div>
                    {
                        sizeDescription.map((size,i)=>(
                            <DetailsAdapter key={i} name={size} setName={setsizeDescription}/>
                        ))
                    }
                    </div>
                    <Input type="text" id="sizeDescription" className="Input" placeholder="Size Description" 
                    value={sizeDescription.join(',')} onChange={(e)=>setsizeDescription(e.target.value.split(','))}
                    />
                </div>
                <div>
                    <Label htmlFor="sizes">Sizes</Label>
                    <br/>
                    <ul className='mt-3'>
                        {sizes.map(size=>(
                            <li key={size.id} className="flex items-center gap-2 my-2">
                                <span>{size.name}</span>
                                <span>{size.stock}</span>
                                <div>
                                    <Button size="sm" variant="destructive" onClick={()=>{
                                        const newSizes = sizes.filter(s=>s.id!==size.id)
                                        setsizes(newSizes)
                                    }}>Delete</Button>  
                                </div>
                            </li>
                        ))}
                    </ul>
                    <br/>
                    <Dialog open={sizediaOpen} onOpenChange={setsizediaOpen}>
                      <DialogTrigger className={buttonVariants({variant:'default',className:'mt-3'})}>Add Size</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Size</DialogTitle>
                          <DialogDescription>
                            
                                <Input type="text" name="size" placeholder="Size" value={sizeName}
                                onChange={(e)=>setsizeName(e.target.value)}
                                />
                                <br/>
                                <Input type="number" name="stock" placeholder="Stock"
                                value={stock}
                                onChange={(e)=>setstock(e.target.value)}
                                />
                                <br/>
                                <Button onClick={
                                    ()=>{
                                        setsizes(p=>[...p,{name:sizeName,stock:Number(stock),id:String(Math.random())}])
                                        setsizediaOpen(false)
                                    }
                                } 
                                disabled={sizeName==''||stock==''}>Add</Button>
                            
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                </div>
                
                <div className='md:col-span-2 flex items-center justify-end gap-2'>
                    <Button onClick={handleAddProduct} disabled={isLoading} className="btn">Add Product</Button>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default AddProductForm