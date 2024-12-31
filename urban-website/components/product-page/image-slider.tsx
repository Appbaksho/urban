"use client"
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from "swiper/types";
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/effect-fade';


interface ProductImageSliderProps {
   images:string[]    
}

const ProductImageSlider = (props:ProductImageSliderProps) => {

    const swiperRef = useRef<SwiperClass | null>(null);


  const handleSlideClick = (index:number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };




  return (
    <div className='overflow-hidden'>
        <Swiper
        modules={[Navigation, Pagination,EffectFade]}
            spaceBetween={10}   
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            navigation
            effect='fade'
            pagination={{ clickable: true }}
            loop={true}
        >
            {
                props.images.map((v,i)=>(
                    <SwiperSlide key={i}>
                        <img
                        src={v}
                        alt=""
                        />
                    </SwiperSlide>
                ))
            }
            
        </Swiper>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-5">
            {props.images.map((img,i)=>(
                <img
                key={i}
                onClick={()=>handleSlideClick(i)}
                className='cursor-pointer h-[50px] w-full object-cover rounded-md'
                src={img}
                alt=""
                />
            ))}
        </div>        
    </div>
  )
}

export default ProductImageSlider