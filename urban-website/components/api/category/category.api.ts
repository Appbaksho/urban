import { api } from "../index.api";
import { Category } from "./category.model";

export const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<Category[],void>({
        query: () => "/category",
        }),
        getSingleCategory: build.query<Category,string>({
            query: (id:string) => `/category/${id}`,
        })
    }),
    overrideExisting: true,
})

export const { useGetCategoriesQuery,useGetSingleCategoryQuery} = categoryApi;