import { UserOrders } from "./cart.model";
import { api } from "@/api"; 
import { AddToCartPayload, Cart, SingleOrder } from "./cart.model";

const cartApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCart: build.query<Cart, string>({
        query: (token:string) => {
            return {
                url: "/cart",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        },
        }),
        getOrders: build.query<UserOrders, string>({
            query: (token:string) => {
                return {
                    url: "/cart/checked-out",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
        }),
        getSingleOrder : build.query<SingleOrder, {token:string,id:string}>({
            query: ({token,id}:{token:string,id:string}) => {
                return {
                    url: `/cart/checked-out/${id}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
        }),
        addToCart: build.mutation<void, AddToCartPayload>({
        query: (payload:AddToCartPayload) => ({
            url: "/cart/add-to-cart",
            method: "POST",
            body: payload,
        }),
        }),
        addManyToCart: build.mutation<void, AddToCartPayload[]>({
            query: (payload:AddToCartPayload[]) => ({
                url: "/cart/add-to-cart/batch",
                method: "POST",
                body: payload,
            }),
        }),
        checkoutProduct: build.mutation<any, string>({
            query: (token:string) => ({
                url: "/cart/checkout",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        removeFromCart: build.mutation<void, string>({
            query: (orderItemId:string) => ({
                url: `/cart/${orderItemId}`,
                method: "DELETE",
            }),
        }),
    }),
    overrideExisting: false,
    });

export const { useLazyGetCartQuery, useAddToCartMutation,useAddManyToCartMutation,useRemoveFromCartMutation,useCheckoutProductMutation,useGetOrdersQuery,useLazyGetOrdersQuery,useGetSingleOrderQuery,useLazyGetSingleOrderQuery} = cartApi;