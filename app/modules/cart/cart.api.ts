import { UserOrders } from "./cart.model";
import { api } from "@/api"; 
import { AddToCartPayload, Cart, SingleOrder } from "./cart.model";

const cartApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCart: build.query<Cart, void>({
        query: () => {
            return {
                url: "/cart",
                method: "GET",
            };
        },
        }),
        getOrders: build.query<UserOrders,void>({
            query: () => {
                return {
                    url: "/cart/checked-out",
                    method: "GET"
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
        checkoutProduct: build.mutation<any, void>({
            query: () => ({
                url: "/cart/checkout",
                method: "POST"
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

export const { useGetCartQuery, useAddToCartMutation,useAddManyToCartMutation,useRemoveFromCartMutation,useCheckoutProductMutation,useGetOrdersQuery,useLazyGetOrdersQuery,useGetSingleOrderQuery,useLazyGetSingleOrderQuery} = cartApi;