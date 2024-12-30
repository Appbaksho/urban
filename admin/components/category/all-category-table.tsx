"use client"
import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import CategoryAdapter from './category-adapter'
import { useGetCategoriesQuery } from './api/category.api'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '../ui/skeleton'
// export interface Category {
//     id:string
//     name: string;
//     description: string;
//     imageUrl: string;
//     parentCategoryId?: string;
//     children?: Category[];
//     childrenCategories?: Category[];
// }
  
const AllCategoryTable = () => {
    const {toast} = useToast()
    const {data,isLoading,isSuccess,isError,error} = useGetCategoriesQuery()

    useEffect(() => {
        if(isError){
            toast({
                title: "Error",
                description: "Cannot fetch categories",
                variant:"destructive",
                duration:3000
              })
        }
        console.log(error)      
    }, [isError,error])
    

  return (
    <div>
        <Table>
          <TableCaption>A list of categories</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description (Short)</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading?
            Array(10).fill("_").map((_,i)=><TableRow key={i}>
                <TableCell colSpan={5}>
                    <Skeleton className='w-full h-[50px]'/>
                </TableCell>
            </TableRow>)
            :data?.map((category)=><CategoryAdapter key={category.id} {...category}/>)}
          </TableBody>
        </Table>
    </div>
  )
}

export default AllCategoryTable