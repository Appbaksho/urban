import { UserPayload } from "../auth/auth.model";
import { api } from "../index.api";

export const customerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCustomer: build.query<UserPayload, string>({
            query: (id: string) => `/customer/${id}`,
        }),
        updateUser: build.mutation<UserPayload, { id: string; data: UserPayload }>({
            query: ({ id, data }) => ({
                url: `/customer/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetCustomerQuery,useLazyGetCustomerQuery,useUpdateUserMutation } = customerApi;