"use client"
import React, { useState } from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { MetaData } from './api/metadata.model'

const BannerContainer = (props:MetaData) => {
    const [link, setlink] = useState<string>(props.bannerUrl)
    const [image, setimage] = useState(props.bannerUrl)
  return (
    <div>
        <p className='font-bold text-xl'>Top Banner</p>
        <Card className="mt-5 p-3">
            <img src={image} alt="banner" className="w-full h-60 object-cover rounded-md" />
            <div className="flex items-center gap-2 mt-3">
            <Input type='file' />
            <Input placeholder='Link' value={link} onChange={e=> setlink(e.target.value)} />
            <Button disabled={props.bannerUrl==image}>Update</Button>
            </div>
        </Card>
    </div>
  )
}

export default BannerContainer