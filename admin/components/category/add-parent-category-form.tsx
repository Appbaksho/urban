"use client"
import { useToast } from '@/hooks/use-toast'
import React, { useEffect, useState } from 'react'
import { useUploadImageMutation } from '../products/api/products.api'
import { useCreateParentCategoryMutation } from './api/category.api'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

const AddParentCategoryForm = () => {
    const [createCategory,{isLoading:createLoading,isError:isCreateError,isSuccess:createSuccess,data:createData,error:createError}] = useCreateParentCategoryMutation()
    const [uploadImage,{data:imageData,isError:isImageError,isSuccess:imageSuccess}] = useUploadImageMutation()
    const [name, setname] = useState<string>('')
    const [desc, setdesc] = useState<string>('')
    const [image, setimage] = useState<File|null>(null)
    const [parentCategoryId, setparentCategoryId] = useState<string>('')
    const [loading , setloading ] = useState(false)

    const {toast} = useToast()

    
          useEffect(() => {
              if(isCreateError){
              toast({
                  title: 'Error',
                  description: "Cannot create category",
                  variant:'destructive',
                  duration: 5000
              })
              console.log('create error',createError)
              }
          }, [isCreateError,createError])
    
          useEffect(() => {
            if(createSuccess){
              toast({
                title: 'Success',
                description: "Category created successfully",
                duration: 5000
              })
              setTimeout(() => {
                window.location.reload()
              }, 1000);
            }
          }, [createSuccess])
    
          
    
          const sendToDB = async () => {
            setloading(true)
              if (!name || !desc || !image) {
                  toast({
                      title: 'Error',
                      description: "All fields are required",
                      variant: 'destructive',
                      duration: 5000
                  })
                  setloading(false)
                  return
              }
    
              try {
                
                  const imageForm = new FormData()
                  imageForm.append('image',image)
    
                  uploadImage(imageForm).then(async res=>{
                  await createCategory({
                      name,
                      description: desc,
                      imageUrl: String(res.data?.imageUrl),
                      parentCategoryId
                  }).unwrap()
                  setloading(false)
                  setname('')
                  setdesc('')
                  setimage(null)
                  setparentCategoryId('')
                }).catch(err=>{
                  console.error('Error uploading image:', err)
                  setloading(false)
                  toast({
                      title: 'Error',
                      description: "Failed to upload image",
                      variant: 'destructive',
                      duration: 5000
                  })
                })
              } catch (error) {
                  setloading(false)
                  console.error('Error creating category:', error)
                  toast({
                      title: 'Error',
                      description: "Failed to create category",
                      variant: 'destructive',
                      duration: 5000
                  })
              }
          }
          
  return (
    <Card className='mt-5'>
    <CardHeader>
      <CardTitle>Create Parent Category</CardTitle>
      <CardDescription>Fill the form to create a category</CardDescription>
    </CardHeader>
    <CardContent className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" value={name} onChange={e=> setname(e.target.value)} id="name" className="mt-1" placeholder="Category Name" />
      </div>
      <div>
          <Label htmlFor="description">Description</Label>
          <Input type="text" id="description" value={desc} onChange={e=> setdesc(e.target.value)} className="mt-1" placeholder="Category Description" />
      </div>
      <div>
          {image&&<img className='h-auto w-[150px] object-cover rounded-md'  src={
              URL.createObjectURL(image)
          } alt="Category Image"/>}
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" onChange={
              e=>setimage(p=> e.target.files?e.target.files[0]:p)
          } className="mt-1" />
      </div>  
      
    </CardContent>
    <CardFooter className='flex justify-end items-center'>
      <Button onClick={sendToDB} disabled={createLoading||loading}>{loading&&<Loader2 size={15} className='animate-spin'/>}Create</Button>
    </CardFooter>
  </Card>
  )
}

export default AddParentCategoryForm