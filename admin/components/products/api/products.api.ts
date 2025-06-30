import { api } from "@/api";
import { ImageResponse, Product } from "./products.model";

export const productsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<Product[], void>({
        query: () => "product",
        }),
        addProduct: build.mutation<Product, Product>({
        query: (product) => ({
            url: "product",
            method: "POST",
            body: product,
        }),
        }),
        uploadImage: build.mutation<ImageResponse, FormData>({
        query: (image:FormData) => ({
            url: "product/upload-image",
            method: "POST",
            body: image,
        }),
        }),
        updateProduct: build.mutation<Product, Product>({
        query: (product) => ({
            url: `product/${product.id}`,
            method: "PUT",
            body: product,
        }),
        }),
        deleteProduct: build.mutation<Product, string>({
        query: (id) => ({
            url: `product/${id}`,
            method: "DELETE",
        }),
        }),
    }),
    overrideExisting: false,
    });
export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation,useUploadImageMutation } = productsApi;