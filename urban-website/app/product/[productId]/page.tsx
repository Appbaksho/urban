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
import { useGetSingleProductQuery } from '@/api/products/products.api';
import { useGetSingleCategoryQuery } from '@/api/category/category.api';
import { Skeleton } from '@/components/ui/skeleton';

const ProductPage = () => {
    const params =  useParams()
    const {data,isLoading,isSuccess,isError,error} = useGetSingleProductQuery(String(params.productId))
    const {data:category,isLoading:categoryLoading,isSuccess:categorySuccess,isError:categoryError} = useGetSingleCategoryQuery(String(data?.categoryId))


    return (
    <>
        <Navbar/>
        {/* <div className='px-5 md:px-10 lg:px-20'>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink href="#">Categories</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {category?.parentCategoryId&&<>
                <BreadcrumbItem>
                <BreadcrumbLink href={`/category/${category.parentCategoryId}`}>Parent</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                </>}
                <BreadcrumbItem>
                <BreadcrumbLink href={`/category/${data?.categoryId}`}>{category?.name}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>

        <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
            {data?<ProductImageSlider images={data?.imageUrl}/>:<Skeleton className='w-full h-[300px] rounded-md'/>}
            {data?<ProductDescriptionSingle {...data}/>:<Skeleton className='w-full h-[300px]'/>}
        </div>
        </div> */}
        <Footer/>
    </>
    );
};


export default ProductPage;