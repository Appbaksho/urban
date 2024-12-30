"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const AddCategoryForm = () => {
    const [name, setname] = useState<string>('')
    const [desc, setdesc] = useState<string>('')
    const [image, setimage] = useState<File|null>(null)
    const [parentCategoryId, setparentCategoryId] = useState<string>('')
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end items-center'>
        <Button><Loader2 size={15} className='animate-spin'/>Create</Button>
      </CardFooter>
    </Card>
  )
}

export default AddCategoryForm