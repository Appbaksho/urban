"use client"
import React, { useEffect, useState } from 'react'
import { Category, parentCategory } from './api/category.model'
import { TableCell, TableRow } from '../ui/table'
import { Edit2, Loader2, Trash2 } from 'lucide-react'
import { Button, buttonVariants } from '../ui/button'
import { useGetCategoriesQuery, useGetParentCategoriesQuery, useUpdateCategoryMutation } from './api/category.api'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useUploadImageMutation } from '../products/api/products.api'
import { Textarea } from '../ui/textarea'

const CategoryAdapter = (props: Category & { refetch?: () => void }) => {
  const { data: categories } = useGetCategoriesQuery()
  const { data: parentCategoryList } = useGetParentCategoriesQuery()
  const [updateCategoryMutation] = useUpdateCategoryMutation()
  const [uploadImage] = useUploadImageMutation()
  const [name, setName] = useState(props.name)
  const [description, setDescription] = useState(props.description)
  const [imageUrl, setImageUrl] = useState(props.imageUrl)
  const [parentCategoryId, setParentCategoryId] = useState(props.parentCategoryId || '')
  const [image, setImage] = useState<File | null>(null)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [parentCategory, setParentCategory] = useState<parentCategory | null>(null)

  // Find parent category for display
  useEffect(() => {
    if (parentCategoryList && props.parentCategoryId) {
      const foundParent = parentCategoryList.find(
        cat => cat.name === props.parentCategoryId
      );
      setParentCategory(foundParent || null);
    }
  }, [parentCategoryList, props.parentCategoryId]);

  // Handle update category
  const updateCategory = async () => {
    setLoading(true)
    let newImageUrl = imageUrl

    try {
      // Upload new image if provided
      if (image) {
        const imageForm = new FormData()
        imageForm.append('image', image)
        const res = await uploadImage(imageForm).unwrap()
        newImageUrl = res.imageUrl
      }

      // Update category
      const updateRes = await updateCategoryMutation({
        id: props.id,
        name,
        description,
        imageUrl: newImageUrl,
        parentCategoryId: parentCategoryId || undefined
      }).unwrap()

      // Update local state with response
      setName(updateRes.name)
      setDescription(updateRes.description)
      setImageUrl(updateRes.imageUrl)
      setParentCategoryId(updateRes.parentCategoryId || '')
      setImage(null)

      // Refetch parent if needed
      if (props.refetch) {
        props.refetch()
      }

      toast({
        title: 'Success',
        description: 'Category updated successfully',
      })
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error',
        description: 'Failed to update category',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <TableRow>
      <TableCell>
        <img src={props.imageUrl} className='w-[100px] h-[50px] rounded-md object-cover' alt={props.name} />
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>
        <div className="max-h-20 overflow-y-auto">
          {props.description}
        </div>
      </TableCell>
      <TableCell>{parentCategory ? parentCategory.name : "None"}</TableCell>
      <TableCell className="flex items-center justify-end gap-2">
        <Dialog>
          <DialogTrigger className={buttonVariants({ size: 'icon', variant: 'outline' })}>
            <Edit2 size={15} />
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Edit Category
              </DialogTitle>
              <DialogDescription className="pt-4 space-y-4">
                <div>
                  <Label>Image</Label>
                  <div className="mt-2">
                    {image ? (
                      <img className='w-[100px] h-[70px] rounded-md object-cover' src={URL.createObjectURL(image)} alt="Preview" />
                    ) : (
                      <img src={imageUrl} className='w-[100px] h-[70px] rounded-md object-cover' alt={name} />
                    )}
                  </div>
                  <Input 
                    type="file" 
                    onChange={(e) => e.target.files && setImage(e.target.files[0])} 
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>Name *</Label>
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Category name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Category description"
                    className="mt-1 min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label>Parent Category</Label>
                  <Select
                    value={parentCategoryId}
                    onValueChange={(value) => setParentCategoryId(value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select parent category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="none" value="">None (Top-level category)</SelectItem>
                      {parentCategoryList
                      ?.map(category => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 justify-end pt-2">
                  <Button 
                    size="sm" 
                    onClick={updateCategory} 
                    disabled={loading || !name}
                  >
                    {loading && <Loader2 className="animate-spin mr-2" size={15} />}
                    Update Category
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        
        <Dialog>
          <DialogTrigger className={buttonVariants({ size: 'icon', variant: 'destructive' })}>
            <Trash2 size={15} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the category.
                <div className="flex justify-end mt-5 items-center gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2" size={15} />
                    Delete Category
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  )
}

export default CategoryAdapter