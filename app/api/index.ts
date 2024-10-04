import {
    BaseQueryFn,
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { env } from "@/config/app.config";

const baseQuery = fetchBaseQuery({
    baseUrl: env.apiUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
        // No accessToken logic
        return headers;
    }
});

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    tagTypes: [],
    endpoints: (builder) => ({})
});