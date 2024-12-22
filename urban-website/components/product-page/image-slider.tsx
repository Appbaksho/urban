"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/effect-fade';
const ProductImageSlider = () => {
  return (
    <div className='overflow-hidden'>
        <Swiper
        modules={[Navigation, Pagination,EffectFade]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            effect='fade'
            pagination={{ clickable: true }}
            loop={true}
        >
            <SwiperSlide>
            
                <img
                src="https://d3j1z37yk0dbyk.cloudfront.net/media/images/238806_4_5__20231207090650959_width_1024.jpg"
                alt=""
                />
            
            </SwiperSlide>
            <SwiperSlide>
            
                <img
                src="https://d3j1z37yk0dbyk.cloudfront.net/media/images/238806_4_5__20231207090650959_width_1024.jpg"
                alt=""
                />
            
            </SwiperSlide>
            <SwiperSlide>
            
                <img
                src="https://d3j1z37yk0dbyk.cloudfront.net/media/images/238806_4_5__20231207090650959_width_1024.jpg"
                alt=""
                />
            
            </SwiperSlide>
            
        </Swiper>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-5">
            {Array(5).fill(0).map((_,i)=>(
                <img
                key={i}
                className='cursor-pointer h-[50px] w-full object-cover rounded-md'
                src="https://d3j1z37yk0dbyk.cloudfront.net/media/images/238806_4_5__20231207090650959_width_1024.jpg"
                alt=""
                />
            ))}
        </div>        
    </div>
  )
}

export default ProductImageSlider