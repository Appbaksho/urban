import { api } from "@/api"; 
import { ImageResponse, Product, ProductPayload, Wishlist } from "./products.model";

export const productsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<Product[], void>({
        query: () => "product",
        }),
        getSingleProduct: build.query<Product,string>({
            query: (id:string) => `/product/${id}`,
        }),
        addToWishlist: build.mutation<Product, string>({
            query: (id:string) => ({
                url: `/product/add-to-favorite/${id}`,
                method: "PUT",
            }),
        }),
        getWishlist: build.query<Wishlist[], string>({
            query: (token:string) => ({
                url: "/product/get-favorite",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        removeWishlist: build.mutation<Wishlist, string>({
            query: (id:string) => ({
                url: `product/remove-from-favorite/${id}`,
                method: "DELETE",
            }),
        }),
        
    }),
    overrideExisting: false,
    });
export const { useGetProductsQuery,useGetSingleProductQuery,useAddToWishlistMutation,useLazyGetWishlistQuery,useRemoveWishlistMutation} = productsApi;  