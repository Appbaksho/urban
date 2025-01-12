import { api } from "@/api";
import { UserPayload } from "./auth.model";

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation<any,UserPayload>({
            query: (data:UserPayload) => ({
                url: "/customer",
                method: "POST",
                body: data,
            }),
        }),
    }),
    overrideExisting: false,
    });
export const { useCreateUserMutation } = authApi;