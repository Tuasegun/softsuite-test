import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const createElementApi = createApi({
    reducerPath: "createElementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: " https://650af6bedfd73d1fab094cf7.mockapi.io"
    }),
    endpoints: (builder) => ({
        createElement: builder.mutation({
            query: (body) => ({
                url: "/elements",
                method: "POST",
                body: body,
            }),
        }),
    }),
});


export const { useCreateElementMutation } = createElementApi;