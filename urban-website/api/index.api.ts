import {
    BaseQueryFn,
    createApi,
    fetchBaseQuery
  } from "@reduxjs/toolkit/query/react";
  import { env } from "@/config/app.config";
  
  const baseQuery = fetchBaseQuery({
    baseUrl: env.apiUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }: any) => {
      const accessToken = window.localStorage.getItem("jwt");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
  
      return headers;
    }
  });
  
  const baseQueryWithRefresh: BaseQueryFn<string, unknown> = async (
    args,
    api,
    extraOptions
  ) => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (result.error?.status === 401) {
      const refreshResult = await baseQuery(
        {
          url: "/access-token/refresh",
          method: "POST"
        },
        api,
        extraOptions
      );
  
      if (refreshResult.data) {
        const { accessToken, refreshToken } = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };
        window.localStorage.setItem("accessToken", accessToken);
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("Token refresh failed");
      }
    }
    return result;
  };
  
  export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithRefresh,
    tagTypes: [],
    endpoints: (builder) => ({})
  });