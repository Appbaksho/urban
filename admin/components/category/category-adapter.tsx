"use client"
import React, { useEffect, useState } from 'react'
import { Category } from './api/category.model'
import { TableCell, TableRow } from '../ui/table'
import { Edit2, Loader2, Table, Trash2 } from 'lucide-react'
import { Button, buttonVariants } from '../ui/button'
import { useGetCategoriesQuery, useGetSingleCategoryQuery, useUpdateCategoryMutation } from './api/category.api'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useUploadImageMutation } from '../products/api/products.api'



const CategoryAdapter = (props:Category) => {
  const {data,isLoading,isSuccess,isError,error} = useGetSingleCategoryQuery(String(props.parentCategoryId))
  const {data:categories,isError:isCatError,error:catError} = useGetCategoriesQuery()
  const [updateCategoryMutation,{data:updateData,isSuccess:isUpdateSuccess,isError:isUpdateError,error:updateError}] = useUpdateCategoryMutation()
  const [uploadImage,{data:imageData,isError:isImageError,isSuccess:imageSuccess}] = useUploadImageMutation()
  const [name, setname] = useState(props.name)
  const [description, setdescription] = useState(props.description)
  const [imageUrl, setimageUrl] = useState(props.imageUrl)
  const [parentCategoryId, setparentCategoryId] = useState(props.parentCategoryId)
  const [image, setimage] = useState<File|null>(null)
  const {toast} = useToast()
  const [loading, setloading] = useState(false)
  useEffect(() => {
    if(isError){
      toast({
        title: 'Error',
        description: 'Cannot get products',
        variant:'destructive',
      })
      console.log(error)
    }
  }, [isSuccess,isError])

  useEffect(() => {
    if(isUpdateError){
      toast({
        title: 'Error',
        description: 'Cannot update category',
        variant:'destructive',
      })
      console.log(updateError)
    }
  }, [isUpdateSuccess,isUpdateError])

  useEffect(() => {
    if(isCatError){
      toast({
        title: 'Error',
        description: 'Cannot get categories',
        variant:'destructive',
      })
      console.log(catError)
    }
  }, [isCatError,catError])

  useEffect(() => {
    if(isUpdateSuccess){
      toast({
        title: 'Success',
        description: 'Category updated successfully',
      })
    }
  }, [isUpdateSuccess])

  useEffect(() => {
    if(isSuccess){
      setimageUrl(data?.imageUrl)
    }
  }, [isSuccess,data])

  useEffect(() => {
    if(isUpdateSuccess){
      setimageUrl(updateData?.imageUrl)
    }
  }, [isUpdateSuccess,updateData])

  const updateCategory = ()=>{
    setloading(true)
    const imageForm = new FormData()
    imageForm.append('image',image as Blob)
    uploadImage(imageForm).then(res=>{
    updateCategoryMutation({
      id:props.id,
      name,
      description,
      imageUrl:String(res.data?.imageUrl),
      parentCategoryId
    }).then(res=>{
      if(res.data){
        setloading(false)
        setname(res.data.name)
        setdescription(res.data.description)
        setimageUrl(res.data.imageUrl)
        if(res.data.parentCategoryId){
          setparentCategoryId(res.data.parentCategoryId)
        }
        if(props.refetch){
          props.refetch()
        }
        toast({
          title: 'Success',
          description: 'Category updated successfully',
        })
      }
    }).catch(err=>{
      setloading(false)
      console.log(err)
      toast({
        title: 'Error',
        description: 'Cannot update category',
        variant:'destructive',
      })
    })
  }).catch(err=>{
    setloading(false)
    console.log(err)
    toast({
      title: 'Error',
      description: 'Cannot upload image',
      variant:'destructive',
    })
  })
  }


  
  return (
    <TableRow>
              <TableCell>
                <img src={props.imageUrl} className='w-[100px] h-[50px] rounded-md object-cover'/>
              </TableCell>
              <TableCell>{props.name}</TableCell>
              <TableCell>{String(props.description).substring(0,20)}...</TableCell>
              <TableCell>{String(data?.name)}</TableCell>
              <TableCell className="flex items-center justify-end gap-2">
               
                <Dialog>
                  <DialogTrigger className={buttonVariants({size:'icon',variant:'outline'})}>
                  <Edit2 size={15}/>
                  </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Edit Category
                    </DialogTitle>
                    <DialogDescription>
                      <div>
                        <Label>Image</Label>
                        {image?<img className='w-[100px] h-[70px] my-2 rounded-md object-cover' src={URL.createObjectURL(image)}/>:<img src={props.imageUrl} className='w-[100px] h-[70px] my-2 rounded-md object-cover'/>}
                        <Input type="file" onChange={(e)=> e.target.files&&setimage(e.target.files[0])}/>
                      </div>
                      <div className='mt-3'>
                        <Label>Name</Label>
                        <Input value={name} onChange={(e)=>setname(e.target.value)}/>
                      </div>
                      <div className='mt-2'>
                        <Label>Description</Label>
                        <Input value={description} onChange={(e)=>setdescription(e.target.value)}/>
                      </div>
                      <div className='mt-2'>
                        <Label>Parent Category</Label>
                        <Select
                          value={parentCategoryId}
                          onValueChange={(e)=>setparentCategoryId(e)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.filter((v)=>v.id!=props.id).map(category=>(
                              <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 justify-end mt-2">
                        <Button size="sm" onClick={updateCategory} disabled={loading}>
                        {loading&&
                    <div className="animate-spin">
                      <Loader2 size={15}/>
                    </div>}
                          Update</Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
                    
                
                <Button size="icon" variant="destructive" disabled={loading}>
                 
                    <Trash2 size={15}/>
                </Button>
              </TableCell>
            
    </TableRow>
  )
}

export default CategoryAdapter