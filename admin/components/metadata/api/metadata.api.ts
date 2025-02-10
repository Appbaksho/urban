import { api } from "@/api";
import { BannerUpdatePayload, DeliveryChargeUpdatePayload, MetaData } from "./metadata.model";

export const metadataApi = api.injectEndpoints({
    endpoints: (build) => ({
        getMetadata: build.query<MetaData, void>({
        query: () => "/metadata",
        }),
        updateBannerData: build.mutation<MetaData, BannerUpdatePayload>({
        query: (data) => ({
            url: "/metadata/top-banner",
            method: "PUT",
            body: data,
        }),
        }),
        updateDeliveryCharges: build.mutation<MetaData, DeliveryChargeUpdatePayload>({
        query: (data) => ({
            url: "/metadata/delivery-charges",
            method: "PUT",
            body: data,
        }),
        }),
    }),
    overrideExisting: false,
    });

export const { useGetMetadataQuery, useUpdateBannerDataMutation,useUpdateDeliveryChargesMutation } = metadataApi;
