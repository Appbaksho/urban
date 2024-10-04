import {
    BaseQueryFn,
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { env } from "@/config/app.config";
import { getAuth } from "@react-native-firebase/auth";

const baseQuery = fetchBaseQuery({
    baseUrl: env.apiUrl,
    credentials: "include",
    prepareHeaders: async (headers) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithRefresh: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // Try to refresh the token
        const auth = getAuth();
        await auth.currentUser?.getIdToken(true);
        result = await baseQuery(args, api, extraOptions);
    }
    return result;
};

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithRefresh,
    tagTypes: [],
    endpoints: (builder) => ({})
});