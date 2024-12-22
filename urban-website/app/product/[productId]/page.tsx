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
import ProductImageSlider from '@/components/product-page/image-slider';
import ProductDescriptionSingle from '@/components/product-page/product-description';

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

        <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
            <ProductImageSlider/>
            <ProductDescriptionSingle/>
        </div>
        </div>
        <Footer/>
    </>
    );
};


export default ProductPage;