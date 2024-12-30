"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useCreateCategoryMutation, useGetCategoriesQuery } from './api/category.api'
import { useToast } from '@/hooks/use-toast'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/firebase/firebase'

const AddCategoryForm = () => {
    const {data,isError,isLoading,error} = useGetCategoriesQuery()
    const [createCategory,{isLoading:createLoading,isError:isCreateError,isSuccess:createSuccess,data:createData,error:createError}] = useCreateCategoryMutation()
    const [name, setname] = useState<string>('')
    const [desc, setdesc] = useState<string>('')
    const [image, setimage] = useState<File|null>(null)
    const [parentCategoryId, setparentCategoryId] = useState<string>('')

    const {toast} = useToast()

    useEffect(() => {
      toast({
        title: 'Error',
        description: "Cannot get categories",
        variant:'destructive',
        duration: 5000
      })
      console.log('fetch error',error)
    }, [isError,error])

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
      }
    }, [createSuccess])

    

    const sendToDB = async () => {
        if (!name || !desc || !image) {
            toast({
                title: 'Error',
                description: "All fields are required",
                variant: 'destructive',
                duration: 5000
            })
            return
        }

        try {
            const storageRef = ref(storage, `categories/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const imageUrl = await getDownloadURL(snapshot.ref);

            await createCategory({
                name,
                description: desc,
                imageUrl,
                parentCategoryId
            }).unwrap()
            setname('')
            setdesc('')
            setimage(null)
            setparentCategoryId('')
        } catch (error) {
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
    <Card>
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
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
        <div>
            <Label htmlFor="parent">Parent Category</Label>
            <Select onValueChange={v=>setparentCategoryId(v)} value={parentCategoryId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {data?.map(category=>(
                    <SelectItem key={category.id} value={category.id}>
                        <Breadcrumb>
                          <BreadcrumbList>
                            <BreadcrumbItem>
                              <BreadcrumbLink href="#">{category.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            {category.childrenCategories?.map(child => (
                                <>
                                <BreadcrumbItem key={child.id}>
                                    <BreadcrumbLink href="#">{child.name}</BreadcrumbLink>
                                    {child.childrenCategories?.map(grandChild => (
                                        <BreadcrumbItem key={grandChild.id}>
                                            <BreadcrumbLink href="#">{grandChild.name}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                    ))}
                                </BreadcrumbItem>
                                {child.childrenCategories && <BreadcrumbSeparator />}
                                </>
                            ))}
                          </BreadcrumbList>
                        </Breadcrumb>
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end items-center'>
        <Button onClick={sendToDB} disabled={isLoading||createLoading}>{createLoading&&<Loader2 size={15} className='animate-spin'/>}Create</Button>
      </CardFooter>
    </Card>
  )
}

export default AddCategoryForm