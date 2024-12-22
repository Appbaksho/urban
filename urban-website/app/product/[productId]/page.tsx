"use client";
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  
import { useParams } from 'next/navigation';
import React from 'react';
import 'tailwindcss/tailwind.css';

const ProductPage = () => {
    const { productId } = useParams();
    const [variant, setVariant] = React.useState(0);
    const vatiantNames = ['Black', 'Green'];
    const imageUrls1 = [
        "https://d3j1z37yk0dbyk.cloudfront.net/media/images/238806_4_5__20231207090650959_width_1024.jpg",
        "https://d3j1z37yk0dbyk.cloudfront.net/media/images/238806cu1__4_5__20231207090651751_width_1024.jpg",
        "https://d3j1z37yk0dbyk.cloudfront.net/media/images/238806cu2__4_5__20231207090652708_width_1024.jpg"
    ];

    const imageUrls2 = [
        "https://d3j1z37yk0dbyk.cloudfront.net/media/images/238807_4_5__20231207090653704_width_1024.jpg",
        "https://d3j1z37yk0dbyk.cloudfront.net/media/images/238807cu1__4_5__20231207090654425_width_1024.jpg"
    ];
    return (
    <>
    
        <Navbar/>
        <div className='px-5 md:px-10 lg:px-20'>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink href="/components">Categories</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Panjabis</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>

        <div className={'mt-6 flex flex-row h-[80vh] mx-[10vw] gap-12'}>
            <div className={'h-full flex-1'}>
                <div className="relative h-full w-fit">
                    <ChevronLeft size={40} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-25 p-2  cursor-pointer" />
                    <img src={imageUrls1[0]} className="h-full w-fit object-contain" />
                    <ChevronRight size={40} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-25 p-2  cursor-pointer" />
                </div>
            </div>
            <div className={'h-full flex-1 flex'}>
                <div className={""}>
                    <div className="text-sm text-gray-950 font-semibold">Platinum Panjabi</div> 
                    <div className="text-sm text-gray-500">{productId}</div> 
                    <div className="text-sm mt-3 text-gray-950 font-bold"> BDT 17,750 </div>
                </div>
            </div>
        </div>
        </div>
        <Footer/>
    </>
    );
};


export default ProductPage;