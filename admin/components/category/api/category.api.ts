import { api } from "@/api";
import { Category, CreateCategory } from "./category.model";

export const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<Category[],void>({
        query: () => "/category",
        }),
        getSingleCategory: build.query<Category,string>({
            query: (id:string) => `/category/${id}`,
        }),
        createCategory: build.mutation<Category,CreateCategory>({
        query: (data: CreateCategory) => ({
            url: "/category",
            method: "POST",
            body: data,
        }),
        }),
        updateCategory: build.mutation<Category,Category>({
        query: (data: Category) => ({
            url: `/category/${data.id}`,
            method: "PUT",
            body: data,
        }),
        }),
    }),
    overrideExisting: true,
})

export const { useGetCategoriesQuery, useCreateCategoryMutation,useGetSingleCategoryQuery,useUpdateCategoryMutation } = categoryApi;