"use client"
import React, { useEffect } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import CategoryBanner, { Category } from './category-banner';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetCategoriesQuery } from '@/components/api/category/category.api';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const LatestAndGreatest = () => {
    const swiper = React.useRef<SwiperRef>(null)
    const {data:category,isLoading,isError,error} = useGetCategoriesQuery()
    const {toast} = useToast()
    useEffect(() => {
      if(isError){
        toast({
          title:'Error',
          description:"Cannot get categories",
          variant:'destructive'
        })
        console.log(error)
      }
    }, [isError])
    


  
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
      {isLoading?Array(10).fill("_").map((_,i)=><SwiperSlide key={i}>
        <Skeleton className='h-[200px] w-full'/>
      </SwiperSlide>):category?.map((v)=>{
          return <SwiperSlide key={v.id}><CategoryBanner 
          name={v.name}
          src={v.imageUrl}
          url={`/category/${v.id}`}/>
          </SwiperSlide>
      })}
    </Swiper>
    
    </div>
  )
}

export default LatestAndGreatest