import { api } from "../index.api";
import { ImageResponse } from "./file.model";

const fileApi = api.injectEndpoints({
    endpoints: (build) => ({
        uploadImage: build.mutation<ImageResponse, FormData>({
            query: (image:FormData) => ({
                url: "product/upload-image",
                method: "POST",
                body: image,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useUploadImageMutation } = fileApi;