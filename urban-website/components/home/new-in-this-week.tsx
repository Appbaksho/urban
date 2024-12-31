"use client"
import React from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './product-card';
import { useGetProductsQuery } from '@/api/products/products.api';

const NewInThisWeek = () => {
  const {data,isLoading,isSuccess,isError,error} = useGetProductsQuery()
    const swiper = React.useRef<SwiperRef>(null)

  return (
    <div className='py-10'>
        <div className="flex items-center justify-between px-5 md:px-10">
            <p className="font-semibold text-xl">New In This Week</p>
            <div className="flex items-center gap-2">
                <Button variant="link">Explore All</Button>
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
        loop={true}
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
        {data?.filter((v)=>{
            return new Date(String(v.createdAt)).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000
        }).sort((a,b)=>{
            return new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime()
        }).map((v,i)=>{
            return <SwiperSlide key={i}><ProductCard {...v}/></SwiperSlide>
        })}
      
    </Swiper>
    </div>
  )
}

export default NewInThisWeek