import { api } from "@/api";
import { MetaData } from "./metadata.model";

export const metadataApi = api.injectEndpoints({
    endpoints: (build) => ({
        getMetadata: build.query<MetaData, void>({
        query: () => "/metadata",
        }),
        updateMetadata: build.mutation<MetaData, Partial<MetaData>>({
        query: (body) => ({
            url: "/metadata",
            method: "PUT",
            body,
        }),
        })
    }),
    overrideExisting: false,
    });

export const { useGetMetadataQuery, useUpdateMetadataMutation } = metadataApi;
