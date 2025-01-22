import { api } from "@/api";
import { BatchOrder, Order, UpdateCartPayload } from "./orders.model";

export const orderApi  = api.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query<BatchOrder[][], void>({
        query: () => "/cart/batch/all/get",
        }),
        getSingleOrder: build.query<Order, string>({
        query: (id) => `/cart/checked-out/${id}`,
        }),
        getSingleBatchOrder: build.query<BatchOrder[], string>({
        query: (id) => `/cart/batch/${id}`,
        }),
        updateOrder: build.mutation<Order, UpdateCartPayload>({
        query: (payload:UpdateCartPayload) => ({
            url: `/cart/batch-update/${payload.id}`,
            method: "PUT",
            body: {
              deliveryStatus: payload.deliveryStatus,
              paymentStatus: payload.paymentStatus
            },
        }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetOrdersQuery,
    useGetSingleOrderQuery,
    useLazyGetSingleOrderQuery,
    useLazyGetSingleBatchOrderQuery,
    useUpdateOrderMutation,
} = orderApi;