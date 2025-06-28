
import { api } from "../index.api";
import { MetaData } from "./metadata.model";

export const metadataApi = api.injectEndpoints({
    endpoints: (build) => ({
        getMetadata: build.query<MetaData, void>({
        query: () => "/metadata",
        }),
    }),
    overrideExisting: false,
    });

export const { useGetMetadataQuery } = metadataApi;
