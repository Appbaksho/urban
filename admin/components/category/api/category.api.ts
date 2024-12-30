import { api } from "@/api";
import { Category, CreateCategory } from "./category.model";

export const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<Category[],void>({
        query: () => "/category",
        }),
        createCategory: build.mutation<Category,CreateCategory>({
        query: (data: CreateCategory) => ({
            url: "/category",
            method: "POST",
            body: data,
        }),
        }),
    }),
    overrideExisting: true,
})

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;