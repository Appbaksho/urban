"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Product, Size } from './api/products.model'
import { useGetCategoriesQuery } from '../category/api/category.api'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { useUpdateProductMutation, useUploadImageMutation } from './api/products.api'
import { useToast } from '@/hooks/use-toast'
import { Switch } from '../ui/switch'
import { Textarea } from "@/components/ui/textarea"

interface EditProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

const EditProductDialog = (props: EditProductDialogProps) => {
  const { data: categories } = useGetCategoriesQuery()
  const [uploadImage] = useUploadImageMutation()
  const [updateProductMutation, { isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: proUpdateError, isLoading }] = useUpdateProductMutation()
  const { toast } = useToast()

  // States
  const [images, setImages] = useState<string[]>(props.product.imageUrl)
  const [selectedCategory, setSelectedCategory] = useState<string>(props.product.categoryId)
  const [details, setDetails] = useState<string[]>(props.product.details)
  const [sizeDescription, setSizeDescription] = useState<string[]>(props.product.sizeDescription)
  const [price, setPrice] = useState<number>(props.product.price)
  const [discountPrice, setDiscountPrice] = useState<string>(props.product.discountPrice ? String(props.product.discountPrice) : '')
  const [sizes, setSizes] = useState<Size[]>(props.product.sizes)
  const [name, setName] = useState<string>(props.product.name)
  const [description, setDescription] = useState<string>(props.product.description)
  const [imagesFiles, setImagesFiles] = useState<File[]>([])
  const [continued, setContinued] = useState<boolean>(props.product.continued ?? true)
  const [uploadStatus, setUploadStatus] = useState('Update')

  // Reset form when product changes
  useEffect(() => {
    if (props.product) {
      setImages(props.product.imageUrl || [])
      setSelectedCategory(props.product.categoryId)
      setDetails(props.product.details || [])
      setSizeDescription(props.product.sizeDescription || [])
      setPrice(props.product.price)
      setDiscountPrice(props.product.discountPrice ? String(props.product.discountPrice) : '')
      setSizes(props.product.sizes || [])
      setName(props.product.name)
      setDescription(props.product.description)
      setContinued(props.product.continued ?? true)
      setImagesFiles([])
    }
  }, [props.product])

  // Handle API responses
  useEffect(() => {
    if (isSuccessUpdate) {
      toast({
        title: 'Success',
        description: 'Product updated successfully',
      })
      props.onOpenChange(false)
    }
  }, [isSuccessUpdate])

  useEffect(() => {
    if (isErrorUpdate) {
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive'
      })
      setUploadStatus('Update')
      console.error(proUpdateError)
    }
  }, [isErrorUpdate, proUpdateError])

  // Handle image uploads
  const uploadImages = async () => {
    if (imagesFiles.length === 0) return images

    const newImages = [...images]
    for (const file of imagesFiles) {
      const imageForm = new FormData()
      imageForm.append('image', file)
      try {
        const res = await uploadImage(imageForm).unwrap()
        newImages.push(res.imageUrl)
      } catch (error) {
        console.error('Image upload failed:', error)
      }
    }
    return newImages
  }

  // Main update function
  const updateProduct = async () => {
    setUploadStatus('Uploading...')
    
    try {
      // Upload new images first
      const updatedImages = await uploadImages()
      
      setUploadStatus('Saving...')
      
      // Prepare payload
      const payload = {
        id: props.product.id,
        name,
        description,
        categoryId: selectedCategory,
        imageUrl: updatedImages,
        details,
        sizeDescription,
        price,
        discountPrice: discountPrice ? Number(discountPrice) : null,
        sizes,
        continued
      }

      // Update product
      await updateProductMutation(payload).unwrap()
      
    } catch (error) {
      console.error('Update failed:', error)
      setUploadStatus('Update')
    }
  }

  // Add new size
  const addSize = () => {
    setSizes([...sizes, {
      id: `new-${Date.now()}`,
      name: '',
      stock: 0,
      productId: props.product.id ?? ''
    }])
  }

  // Update size field
  const updateSize = (index: number, field: keyof Size, value: string | number) => {
    const newSizes = [...sizes]
    newSizes[index] = { ...newSizes[index], [field]: value }
    setSizes(newSizes)
  }

  // Remove size
  const removeSize = (index: number) => {
    const newSizes = [...sizes]
    newSizes.splice(index, 1)
    setSizes(newSizes)
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Images Section */}
              <div className="md:col-span-2">
                <Label>Product Images</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                  {images.map((image, i) => (
                    <Card key={i} className='relative h-32'>
                      <CardContent className="p-0 h-full">
                        <img 
                          src={image} 
                          alt={`Product ${i+1}`} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </CardContent>
                      <CardDescription className='absolute top-1 right-1'>
                        <Button 
                          size="icon" 
                          variant="destructive" 
                          className="h-6 w-6"
                          onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                        >
                          <Trash2 size={12} />
                        </Button>
                      </CardDescription>
                    </Card>
                  ))}
                  {imagesFiles.map((image, i) => (
                    <Card key={`file-${i}`} className='relative h-32'>
                      <CardContent className="p-0 h-full">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`New image ${i+1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </CardContent>
                      <CardDescription className='absolute top-1 right-1'>
                        <Button 
                          size="icon" 
                          variant="destructive" 
                          className="h-6 w-6"
                          onClick={() => setImagesFiles(imagesFiles.filter((_, idx) => idx !== i))}
                        >
                          <Trash2 size={12} />
                        </Button>
                      </CardDescription>
                    </Card>
                  ))}
                  <Card className="h-32 flex items-center justify-center">
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <Label htmlFor="product-images" className="cursor-pointer">
                        <Plus size={24} className="mb-1" />
                        <span>Add Images</span>
                      </Label>
                      <Input 
                        id="product-images"
                        type="file" 
                        multiple 
                        className="hidden"
                        onChange={(e) => {
                          if (!e.target.files) return
                          setImagesFiles([...imagesFiles, ...Array.from(e.target.files)])
                        }} 
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Basic Info */}
              <div>
                <Label>Product Name *</Label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter product name"
                />
              </div>
              
              <div>
                <Label>Category *</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <Label>Description *</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed product description"
                  rows={4}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label>Details (comma separated)</Label>
                <Input 
                  value={details.join(',')} 
                  onChange={(e) => setDetails(e.target.value.split(',').filter(Boolean))} 
                  placeholder="Feature1, Feature2, ..."
                />
              </div>
              
              <div className="md:col-span-2">
                <Label>Size Description (comma separated)</Label>
                <Input 
                  value={sizeDescription.join(',')} 
                  onChange={(e) => setSizeDescription(e.target.value.split(',').filter(Boolean))} 
                  placeholder="Small: 10cm, Medium: 15cm, ..."
                />
              </div>

              {/* Pricing */}
              <div>
                <Label>Price *</Label>
                <Input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(Number(e.target.value))} 
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <Label>Discount Price</Label>
                <Input 
                  type="number" 
                  value={discountPrice} 
                  onChange={(e) => setDiscountPrice(e.target.value)} 
                  min="0"
                  step="0.01"
                  placeholder="Optional"
                />
              </div>
              
              {/* Sizes Section */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <Label>Sizes & Stock</Label>
                  <Button size="sm" variant="outline" onClick={addSize}>
                    <Plus size={16} className="mr-1" /> Add Size
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {sizes.map((size, index) => (
                    <div key={size.id} className="flex gap-3">
                      <div className="flex-1">
                        <Label>Size Name</Label>
                        <Input
                          value={size.name}
                          onChange={(e) => updateSize(index, 'name', e.target.value)}
                          placeholder="e.g., Small, Medium, ..."
                        />
                      </div>
                      <div className="flex-1">
                        <Label>Stock</Label>
                        <Input
                          type="number"
                          value={size.stock}
                          onChange={(e) => updateSize(index, 'stock', Number(e.target.value))}
                          min="0"
                        />
                      </div>
                      <div className="flex items-end pb-1">
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => removeSize(index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {sizes.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No sizes added yet
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Options */}
              <div className="flex items-center space-x-2">
                <Switch 
                  id="continued" 
                  checked={continued} 
                  onCheckedChange={setContinued} 
                />
                <Label htmlFor="continued">Available for sale</Label>
              </div>
              
              <div className="flex items-center justify-end gap-2 md:col-span-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => props.onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={updateProduct} 
                  disabled={isLoading || !name || !description || !price || !selectedCategory}
                >
                  {isLoading && <Loader2 className="animate-spin mr-2" size={16} />}
                  {isLoading ? uploadStatus : 'Update Product'}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditProductDialog