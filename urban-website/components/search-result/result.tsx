import React from 'react'
import ProductCard from '../home/product-card'
import { useSearchParams } from 'next/navigation'
import { useGetProductsQuery } from '@/components/api/products/products.api'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '../ui/skeleton'

const SearchResultProducts = () => {
  const params = useSearchParams()
  const {data:products,isLoading,isSuccess,isError,error} = useGetProductsQuery()
  const {toast} = useToast()
  React.useEffect(() => {
    if(isError){
      toast({
        title:'Error',
        description:"Cannot get products",
        variant:'destructive'
      })
      console.log(error)
    }
  }, [isError])
  return (
    <div className='mt-10 grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-3'>
        {isLoading?Array.from({length: 8}).map((_,i)=>(
            <Skeleton key={i} className='h-[300px] w-full'/>
        )):products?.filter((v)=>{
            return v.name.toLowerCase().includes(String(params.get('query')?.toLowerCase())) || v.description.toLowerCase().includes(String(params.get('query')?.toLowerCase()))
        }).map((v,i)=>{
            return <ProductCard key={i} {...v}/>
        })}
    </div>
  )
}

export default SearchResultProducts