"use client"
import React from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css'
import  { Category } from './category-banner';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryContainer from './category-container';

const ExploreMore = () => {
    const swiper = React.useRef<SwiperRef>(null)
    const sampleCategories:Category[] = [
      {
        src:'/products/kids.webp',
        name:'Kids',
        url:'/category/hoodie'
      },
      {
        src:'/products/kids-1.jpg',
        name:'Kids Jackets',
        url:'/category/jackets'
      },
      {
        src:'/products/hoodie-3.png',
        name:'Cotton Hoodie',
        url:'/category/joggers'
      },
      {
        src:'/products/hoodie-4.jpg',
        name:'Olive Hoodie',
        url:'/category/sweatshirt'
      },
      {
        src:'/products/hoodie-5.webp',
        name:'Orange Hoodie',
        url:'/category/sweatshirt'
      }
    ]
  return (
    <div className='py-10'>
        <div className="flex items-center justify-between px-5 md:px-10">
            <p className="font-semibold text-xl">Explore More</p>
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
        {
          sampleCategories.map((v,i)=>{
            return <SwiperSlide key={i}><CategoryContainer {...v}/></SwiperSlide>
        })
        }
      
    </Swiper>
    </div>
  )
}

export default ExploreMore