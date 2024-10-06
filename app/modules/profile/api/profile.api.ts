import { api } from "@/api";
import { CreateCustomerDto, Customer } from "../models/customer.model";

const profileApi = api.injectEndpoints({
    endpoints: (builder)=>({
        createProfile: builder.mutation<CreateCustomerDto,any>({
            query: (data)=>({
                url: '/customer',
                method: 'POST',
                body: data,
            }),
        }),
        getProfile: builder.query<null,Customer>({
            query: ()=>({
                url: '/customer/get/me',
                method: 'GET',
            }),
        }),
    }),
})

export const { useCreateProfileMutation } = profileApi;