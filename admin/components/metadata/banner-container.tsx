"use client"

import { useEffect, useState } from "react"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import type { MetaData } from "./api/metadata.model"
import { useUpdateBannerDataMutation } from "./api/metadata.api"
import { toast } from "@/hooks/use-toast"
import { Loader2, Plus, Trash2, Upload } from "lucide-react"
import { Label } from "../ui/label"
import { useUploadImageMutation } from "../products/api/products.api"

interface ImageItem {
  id: string
  url: string
  file?: File
  isUploading?: boolean
}

const BannerContainer = (props: MetaData) => {
  const [link, setLink] = useState<string>(props.bannerUrl)
  const [images, setImages] = useState<ImageItem[]>([])
  const [title, setTitle] = useState(props.title)
  const [description, setDescription] = useState(props.description)

  const [
    imageUploadMutation,
    {
      data: imageData,
      isError: isImageUploadError,
      error: imageUploadError,
      isSuccess: isImageUploadSuccess,
      isLoading: isImageUploading,
    },
  ] = useUploadImageMutation()

  const [
    editBanner,
    { isLoading: isUpdatingBanner, isSuccess: isBannerUpdated, isError: isBannerUpdateError, error: bannerUpdateError },
  ] = useUpdateBannerDataMutation()

  // Initialize state from props
  useEffect(() => {
    setLink(props.bannerUrl)
    setTitle(props.title)
    setDescription(props.description)

    // Handle bannerImage as array or single string
    if (Array.isArray(props.bannerImage)) {
      const imageItems = props.bannerImage.map((url, index) => ({
        id: `existing-${index}`,
        url: url,
      }))
      setImages(imageItems)
    } else if (props.bannerImage) {
      setImages([{ id: "existing-0", url: props.bannerImage }])
    } else {
      setImages([])
    }
  }, [props.bannerUrl, props.bannerImage, props.title, props.description])

  // Handle banner update response
  useEffect(() => {
    if (isBannerUpdated) {
      if (props.refetch) {
        props.refetch()
      }
      toast({
        title: "Success!",
        description: "Banner updated successfully",
      })
      // Remove any file references after successful update
      setImages((prev) => prev.map((img) => ({ ...img, file: undefined, isUploading: false })))
    }

    if (isBannerUpdateError) {
      console.log(bannerUpdateError)
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Failed to update banner. Contact with the developer",
      })
    }
  }, [isBannerUpdated, isBannerUpdateError])

  // Handle image upload response
  useEffect(() => {
    if (isImageUploadSuccess && imageData?.imageUrl) {
      // Update the uploading image with the new URL
      setImages((prev) =>
        prev.map((img) =>
          img.isUploading ? { ...img, url: imageData.imageUrl, isUploading: false, file: undefined } : img,
        ),
      )

      toast({
        title: "Success!",
        description: "Image uploaded successfully",
      })
    }

    if (isImageUploadError) {
      // Remove the failed upload
      setImages((prev) => prev.filter((img) => !img.isUploading))
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Failed to upload image. Contact with the developer",
      })
    }
  }, [isImageUploadSuccess, isImageUploadError, imageData])

  // Add new image file
  const addImageFile = (file: File) => {
    const newImage: ImageItem = {
      id: `new-${Date.now()}`,
      url: URL.createObjectURL(file),
      file: file,
    }
    setImages((prev) => [...prev, newImage])
  }

  // Remove image
  const removeImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  // Upload specific image
  const uploadImage = (imageId: string) => {
    const image = images.find((img) => img.id === imageId)
    if (!image?.file) return

    setImages((prev) => prev.map((img) => (img.id === imageId ? { ...img, isUploading: true } : img)))

    const formData = new FormData()
    formData.append("image", image.file)
    imageUploadMutation(formData)
  }

  // Upload all pending images
  const uploadAllPendingImages = async () => {
    const pendingImages = images.filter((img) => img.file && !img.isUploading)

    for (const image of pendingImages) {
      uploadImage(image.id)
      // Add small delay between uploads to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  // Update banner
  const updateBanner = () => {
    const pendingUploads = images.filter((img) => img.file && !img.isUploading)

    if (pendingUploads.length > 0) {
      toast({
        title: "Upload Required",
        description: "Please upload all images before updating the banner",
      })
      return
    }

    // Get all image URLs (excluding files)
    const imageUrls = images.filter((img) => !img.file).map((img) => img.url)

    editBanner({
      bannerImage: imageUrls,
      bannerUrl: link,
      title,
      description,
    })
  }

  const hasPendingUploads = images.some((img) => img.file && !img.isUploading)
  const hasUploadingImages = images.some((img) => img.isUploading)

  return (
    <div>
      <p className="font-bold text-xl">Top Banner</p>

      <Card className="mt-5 p-4">
        {/* Current Images Display */}
        {images.length > 0 && (
          <div className="mb-4">
            <Label className="text-base font-semibold mb-3 block">Current Banner Images</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md border"
                  />

                  {/* Image overlay with actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2">
                    {image.file && !image.isUploading && (
                      <Button size="sm" variant="secondary" onClick={() => uploadImage(image.id)} className="h-8 px-2">
                        <Upload className="w-4 h-4" />
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeImage(image.id)}
                      className="h-8 px-2"
                      disabled={image.isUploading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Loading overlay */}
                  {image.isUploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-md">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}

                  {/* Status indicators */}
                  <div className="absolute top-2 right-2 text-xs">
                    {image.file && !image.isUploading && (
                      <span className="bg-orange-500 text-white px-2 py-1 rounded">Pending</span>
                    )}
                    {image.isUploading && <span className="bg-blue-500 text-white px-2 py-1 rounded">Uploading</span>}
                  </div>

                  {/* Image number */}
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Image */}
        <div className="mb-4">
          <Label>Add New Image</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  addImageFile(file)
                  e.target.value = "" // Reset input
                }
              }}
              className="hidden"
              id="add-image"
            />
            <label htmlFor="add-image" className="cursor-pointer">
              <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Click to add image</p>
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div>
            <Label>Link</Label>
            <Input placeholder="Banner Link" value={link} onChange={(e) => setLink(e.target.value)} />
          </div>

          <div>
            <Label>Title</Label>
            <Input placeholder="Banner Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <Input
              placeholder="Banner Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex gap-3">
            {hasPendingUploads && (
              <Button
                variant="outline"
                onClick={uploadAllPendingImages}
                disabled={hasUploadingImages}
                className="flex-1 bg-transparent"
              >
                {hasUploadingImages && <Loader2 className="animate-spin mr-2" />}
                Upload All Images
              </Button>
            )}

            <Button
              className={hasPendingUploads ? "flex-1" : "w-full"}
              disabled={
                isUpdatingBanner ||
                !link ||
                !title ||
                !description ||
                images.length === 0 ||
                hasPendingUploads ||
                hasUploadingImages
              }
              onClick={updateBanner}
            >
              {isUpdatingBanner && <Loader2 className="animate-spin mr-2" />}
              Update Banner
            </Button>
          </div>
        </div>

        {/* Status Messages */}
        {hasPendingUploads && (
          <p className="text-sm text-orange-600 mt-2">
            {images.filter((img) => img.file && !img.isUploading).length} image(s) need to be uploaded before updating
          </p>
        )}

        {images.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">Add at least one image to create the banner</p>
        )}
      </Card>
    </div>
  )
}

export default BannerContainer
