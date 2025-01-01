import { api } from "../index.api";
import { AddToCartPayload, Cart } from "./cart.model";

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
        removeFromCart: build.mutation<void, string>({
            query: (orderItemId:string) => ({
                url: `/cart/${orderItemId}`,
                method: "DELETE",
            }),
        }),
    }),
    overrideExisting: false,
    });

export const { useLazyGetCartQuery, useAddToCartMutation,useAddManyToCartMutation,useRemoveFromCartMutation } = cartApi;