import { api } from "@/api";
import { User } from "./customer.model";

export const customerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCustomers: build.query<User[], void>({
        query: () => "customer",
        }),
        getCustomer: build.query<User, string>({
        query: (id) => `customer/${id}`,
        })
    }),
    overrideExisting: false,
    });

export const {
    useGetCustomersQuery,
    useGetCustomerQuery
} = customerApi;