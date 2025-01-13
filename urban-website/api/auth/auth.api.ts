import { api } from "../index.api";
import { UserPayload } from "./auth.model";

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation<any,UserPayload>({
            query: (data) => ({
                url: "/customer",
                method: "POST",
                body: data,
            }) as any,
        }),
    }),
    overrideExisting: false,
    });
export const { useCreateUserMutation } = authApi;