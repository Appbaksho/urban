import {api} from "@/api";

const notificationApi = api.injectEndpoints({
    endpoints: (builder)=>({
        sendTestNotification: builder.mutation({
            query: ()=>({
                url: '/firebase',
                method: 'GET',
            }),
        }),
        testAuth: builder.mutation({
            query: ()=>({
                url: '/firebase/auth/test',
                method: 'GET',
            }),
        })
    })
});

export const {
    useSendTestNotificationMutation,
    useTestAuthMutation
} = notificationApi;