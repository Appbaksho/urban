import { api } from "@/api";
import { BatchOrder, Order } from "./orders.model";

export const orderApi  = api.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query<BatchOrder[][], void>({
        query: () => "/cart/batch/all/get",
        }),
        getSingleOrder: build.query<Order, string>({
        query: (id) => `/cart/checked-out/${id}`,
        })
    }),
    overrideExisting: false,
});

export const {
    useGetOrdersQuery,
    useGetSingleOrderQuery,
    useLazyGetSingleOrderQuery
} = orderApi;