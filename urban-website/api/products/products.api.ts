
import { api } from "../index.api";
import { ImageResponse, Product, ProductPayload } from "./products.model";

export const productsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<Product[], void>({
        query: () => "product",
        }),
    }),
    overrideExisting: false,
    });
export const { useGetProductsQuery} = productsApi;