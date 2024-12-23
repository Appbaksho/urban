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
import ProductImageSlider from '@/components/product-page/image-slider';
import ProductDescriptionSingle from '@/components/product-page/product-description';

const ProductPage = () => {
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