"use client"
import React from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import CategoryBanner, { Category } from './category-banner';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LatestAndGreatest = () => {
    const swiper = React.useRef<SwiperRef>(null)
    const demoProducts:Category[] = [
        {
            src:'/products/hoodie-1.webp',
            name:'Hoodie',
            url:'/category/hoodie'
        },
        {
            src:'/products/jacket-1.webp',
            name:'Jackets',
            url:'/category/jackets'
        },
        {
            src:'/products/joggers.webp',
            name:'Joggers',
            url:'/category/joggers'
        },
        {
          src:'/products/sweatshirt.webp',
          name:'Sweatshirt',
          url:'/category/sweatshirt'
        }
      ]
  return (
    <div className='py-10'>
        <div className="flex items-center justify-between px-5 md:px-10">
            <p className="font-semibold text-xl">Latest & Greatest</p>
            <div className="flex items-center gap-2">
                <Button variant="secondary" 
                disabled={swiper.current?.swiper.isBeginning}
                 onClick={()=> swiper.current?.swiper.slidePrev()} className='rounded-full h-[40px] w-[40px] flex items-center justify-center p-0 bg-gray-200 hover:bg-gray-300'>
                    <ChevronLeft size={22} strokeWidth={1}/>
                </Button>
                <Button variant="secondary" disabled={swiper.current?.swiper.isEnd} onClick={()=> swiper.current?.swiper.slideNext()} className='rounded-full h-[40px] w-[40px] flex items-center justify-center p-0 bg-gray-200 hover:bg-gray-300'>
                    <ChevronRight size={22} strokeWidth={1}/>
                </Button>
            </div>
        </div>
       
        <Swiper
        ref={swiper}
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
      {demoProducts.map((v,i)=>{
          return <SwiperSlide key={i}><CategoryBanner {...v}/></SwiperSlide>
      })}
    </Swiper>
    
    </div>
  )
}

export default LatestAndGreatest