import { UserPayload } from "../auth/auth.model";
import { api } from "../index.api";

export const customerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCustomer: build.query<UserPayload, string>({
            query: (id: string) => `/customer/${id}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetCustomerQuery,useLazyGetCustomerQuery } = customerApi;