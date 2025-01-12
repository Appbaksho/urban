import { api } from "@/api"; 
import { Category, Metadata } from "./category.model";

export const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<Category[],void>({
        query: () => "/category",
        }),
        getSingleCategory: build.query<Category,string>({
            query: (id:string) => `/category/${id}`,
        }),
        getMetadata: build.query<Metadata,void>({
            query: () => "/metadata"
        }),
    }),
    overrideExisting: true,
})

export const { useGetCategoriesQuery,useGetSingleCategoryQuery, useGetMetadataQuery} = categoryApi;