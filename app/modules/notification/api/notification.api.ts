import {api} from "@/api";

const notificationApi = api.injectEndpoints({
    endpoints: (builder)=>({
        sendTestNotification: builder.mutation({
            query: ()=>({
                url: '/firebase',
                method: 'GET',
            }),
        }),
    })
});

export const {useSendTestNotificationMutation} = notificationApi;