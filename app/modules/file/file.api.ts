import { api } from "@/api";
import { ImageResponse } from "./file.model";

const fileApi = api.injectEndpoints({
    endpoints: (build) => ({
        uploadImage: build.mutation<ImageResponse, FormData>({
            query: (body) => ({
                url: "/product/upload-image",
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        }),
    }),
    overrideExisting: false,
});

export const { useUploadImageMutation } = fileApi;