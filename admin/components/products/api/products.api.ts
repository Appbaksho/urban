import { api } from "@/api";
import { Product, ProductPayload } from "./products.model";

export const productsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<Product[], void>({
        query: () => "product",
        }),
        addProduct: build.mutation<Product, ProductPayload>({
        query: (product) => ({
            url: "product",
            method: "POST",
            body: product,
        }),
        }),
        updateProduct: build.mutation<Product, Product>({
        query: (product) => ({
            url: `product/${product.id}`,
            method: "PUT",
            body: product,
        }),
        }),
        deleteProduct: build.mutation<Product, number>({
        query: (id) => ({
            url: `product/${id}`,
            method: "DELETE",
        }),
        }),
    }),
    overrideExisting: false,
    });
export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApi;