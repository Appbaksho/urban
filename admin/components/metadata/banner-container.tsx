"use client"
import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { MetaData } from './api/metadata.model'
import { useUpdateBannerDataMutation } from './api/metadata.api'
import { toast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { useUploadImageMutation } from '../products/api/products.api'

const BannerContainer = (props:MetaData) => {
    const [link, setlink] = useState<string>(props.bannerUrl)
    const [image, setimage] = useState(props.bannerImage)
    const [title, settitle] = useState(props.title)
    const [description, setdescription] = useState(props.description)
    const [imageFile, setimageFile] = useState<File|null>(null)
    const [imageUploadMutation,{data:imageData,isError:isImageUploadError,error:imageUploadError,isSuccess:isImageUploadSuccess,isLoading:isImageUploading}] = useUploadImageMutation()

   
    const [editBanner,{
        isLoading: isUpdatingBanner,
        isSuccess: isBannerUpdated,
        isError: isBannerUpdateError,
        error: bannerUpdateError
    }] = useUpdateBannerDataMutation()

    useEffect(() => {
        setlink(props.bannerUrl)
        setimage(props.bannerImage)
        settitle(props.title)
        setdescription(props.description)
    }, [props.bannerUrl,props.bannerImage,props.title,props.description])

    useEffect(() => {
        if(isBannerUpdated){
            if(props.refetch){
                props.refetch()
            }
            toast({
                title:"Success!",
                description:"Banner updated successfully"
            })
            setimageFile(null)
        }
        if(isBannerUpdateError){
            console.log(bannerUpdateError)
            toast({
                variant:'destructive',
                title:"Error!",
                description:"Failed to update banner. contact with the developer"
            })
        }
    }, [isBannerUpdated,isBannerUpdateError])


    useEffect(() => {
      if(isImageUploadSuccess){
          setimage(imageData?.imageUrl)
          console.log("IMAGE DATA",imageData)
          toast({
              title:"Success!",
              description:"Image uploaded successfully"
          })
          editBanner({bannerImage:image,bannerUrl:link,title,description})
      }
      if(isImageUploadError){
          toast({
              variant:'destructive',
              title:"Error!",
              description:"Failed to upload image. contact with the developer"
          })
      }
  }, [isImageUploadSuccess,isImageUploadError])


    const updateBanner = () => {
        if(imageFile){
            const formData = new FormData()
            formData.append('image',imageFile)
            imageUploadMutation(formData)
            return
        }
        editBanner({bannerImage:image,bannerUrl:link,title:props.title,description:props.description})
    }


  return (
    <div>
        <p className='font-bold text-xl'>Top Banner</p>
        <Card className="mt-5 p-3">
            <img src={image} alt="banner" className="w-full h-60 object-cover rounded-md" />
            {imageFile&&<p className='mt-3 text-sm mb-2'>Selected Image</p>}
            {imageFile&&<img src={URL.createObjectURL(imageFile)} alt="banner" className="w-full h-60 object-cover rounded-md" />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
              <div>
                
            <Label>Image</Label>
            <Input type='file' onChange={e=> setimageFile(e.target.files&&e.target.files[0])} />
            </div>
            <div>
              <Label>Link</Label>
              <Input placeholder='Link' value={link} onChange={e=> setlink(e.target.value)} />
            </div>
            <div>
              <Label>Title</Label>
              <Input placeholder='Title' value={title} onChange={e=> settitle(e.target.value)} />
            </div>
            <div>
              <Label>Description</Label>
            <Input placeholder='Description' value={description} onChange={e=> setdescription(e.target.value)} />
            </div>
            <Button className='md:col-span-2' disabled={isUpdatingBanner||!link||!image||!title||!description||isImageUploading} onClick={updateBanner}>{(isUpdatingBanner||isImageUploading)&&<Loader2 className='animate-spin'/>}Update</Button>
            </div>
        </Card>
    </div>
  )
}

export default BannerContainer