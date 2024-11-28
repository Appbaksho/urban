"use client"
import React from 'react'
import { Swiper, SwiperRef, SwiperSlide, useSwiper } from 'swiper/react';
import {Navigation} from 'swiper/modules'
import 'swiper/css'
import CategoryBanner from './category-banner';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryContainer from './category-container';

const ShopOurIcons = () => {
    
    const swiper = React.useRef<SwiperRef>(null)
  return (
    <div className='py-10'>
        <div className="flex items-center justify-between px-5 md:px-10">
            <p className="font-semibold text-xl">Shop Our Icons</p>
            <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={()=> swiper.current?.swiper.slidePrev()} className='rounded-full h-[40px] w-[40px] flex items-center justify-center p-0 bg-gray-200 hover:bg-gray-300'>
                    <ChevronLeft size={22} strokeWidth={1}/>
                </Button>
                <Button variant="secondary" onClick={()=> swiper.current?.swiper.slideNext()} className='rounded-full h-[40px] w-[40px] flex items-center justify-center p-0 bg-gray-200 hover:bg-gray-300'>
                    <ChevronRight size={22} strokeWidth={1}/>
                </Button>
            </div>
        </div>
        <Swiper
        ref={swiper}
        centeredSlides
        loop
        className='mt-5'
      spaceBetween={20}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
        {Array(10).fill("_").map((v,i)=>{
            return <SwiperSlide key={i}><CategoryContainer/></SwiperSlide>
        })}
      
    </Swiper>
    </div>
  )
}

export default ShopOurIcons