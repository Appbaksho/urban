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
import { Loader2, Trash2 } from 'lucide-react'
import { useUpdateProductMutation, useUploadImageMutation } from './api/products.api'
import { useToast } from '@/hooks/use-toast'

interface EditProductDialogProps {
  open: boolean
  onOpenChange: (open:boolean)=>void    
  product:Product
}


const EditProductDialog = (props:EditProductDialogProps) => {
    const {data:categories,isError,error} = useGetCategoriesQuery()
    const [uploadImage,{data,isError:isImageUploadError,error:imageUploadError,isSuccess}] = useUploadImageMutation()
    const [updateProductMutation,{data:proUpdateData, isSuccess:isSuccessUpdate, isError:isErrorUpdate, error:proUpdateError,isLoading}] = useUpdateProductMutation()

    
    const [images, setimages] = useState<string[]>(props.product.imageUrl)
    const [selectedCategory, setselectedCategory] = useState<string>(props.product.categoryId)
    const [details, setdetails] = useState<string[]>(props.product.details)
    const [sizeDescription, setsizeDescription] = useState<string[]>(props.product.sizeDescription)
    const [price, setprice] = useState<number>(props.product.price)
    const [discountPrice, setdiscountPrice] = useState<null|string>(props.product.discountPrice)
    const [sizes, setsizes] = useState<Size[]>(props.product.sizes)
    const [name, setname] = useState<string>(props.product.name)
    const [description, setdescription] = useState<string>(props.product.description)
    const [imagesFiles, setimagesFiles] = useState<File[]>([])
    const [uploadStatus, setuploadStatus] = useState('Update')
    const {toast} = useToast()
    useEffect(() => {
      if(isError){
            console.log(error)
        }
    }, [isError,error])

    useEffect(() => {
      if(isImageUploadError){
            console.log(imageUploadError)
        }
    }, [isImageUploadError,imageUploadError])
    
    useEffect(() => {
       
      if(isSuccess){
        if(data){
        console.log(data)
        }
      }
    }, [isSuccess,data])

    useEffect(() => {
      if(isSuccessUpdate){
        toast({
            title: 'Success',
            description: 'Product Updated',
        })
        if(proUpdateData){
          console.log(proUpdateData)
        }
      }
    }, [isSuccessUpdate,proUpdateData])

    useEffect(() => {
        if(isErrorUpdate){
            toast({
                title: 'Error',
                description: 'Cannot update product',
                variant: 'destructive'
            })
            console.log(proUpdateError)
        }
        }
    , [isErrorUpdate,proUpdateError])

    const updateProduct = ()=>{
        setuploadStatus('Uploading Image') 
        
        imagesFiles.forEach(async file=>  {
            const imageForm = new FormData()
            imageForm.append('image',file)
            uploadImage(imageForm).then(res=>{
                if(res.data){
                    setimages(p=>[...p,res.data.imageUrl])
                }
            })
        })
        setimagesFiles([])
        setuploadStatus('Updating')

        updateProductMutation({
            id:props.product.id,
            categoryId:selectedCategory,
            description,
            details,
            discountPrice,
            imageUrl:images,
            name,
            price,
            sizes,
            sizeDescription,
        }).then(res=>{
            if(res.data){
                console.log(res.data)
                setuploadStatus('Update')
            }
        }).catch(err=>{
            console.log(err)
            setuploadStatus('Update')
        })

    }

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
                     {imagesFiles.map((image,i)=>(
                        <Card key={i} className='relative h-[120px]'>
                          <CardContent>
                             <img src={URL.createObjectURL(image)} className="w-full h-[120px] object-cover absolute top-0 left-0 bottom-0 right-0 rounded-md"/>
                          </CardContent>
                          <CardDescription className='flex justify-end absolute top-0 right-0 p-1'>
                            <Button size="sm" variant="destructive" onClick={()=>{
                                const newImages = imagesFiles.filter((_,index)=>index!==i)
                                setimagesFiles(p=>[...newImages])
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
                            setimagesFiles(p=>[...p,...files])
                        }} placeholder='Files'/>
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
                    <Label>Details</Label>
                    <Input value={details.join(',')} onChange={(e)=>setdetails(e.target.value.split(','))} />
                </div>
                <div>
                    <Label>Size Description</Label>
                    <Input value={sizeDescription.join(',')} onChange={(e)=>setsizeDescription(e.target.value.split(','))} />
                </div>
                <div>
                    <Label>Price</Label>
                    <Input type="number" value={price} onChange={(e)=>setprice(Number(e.target.value))} />
                </div>
                <div>
                    <Label>Discount Price</Label>
                    <Input type="number" value={String(discountPrice)} onChange={(e)=>setdiscountPrice(e.target.value)} />
                </div>
                <div className='flex items-center justify-end gap-2'>
                    <Button onClick={updateProduct} disabled={uploadStatus!="Update"}>{isLoading&&<Loader2 className='animate-spin mr-1' size={15}/>}{uploadStatus}</Button>
                </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditProductDialog