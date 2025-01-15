import { api } from "@/api";
import { Order } from "./orders.api";

export const orderApi  = api.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query<Order[], void>({
        query: () => "/cart/checked-out-all",
        }),
        getOrder: build.query<Order, string>({
        query: (id) => `order/${id}`,
        })
    }),
    overrideExisting: false,
});

export const {
    useGetOrdersQuery,
    useGetOrderQuery
} = orderApi;