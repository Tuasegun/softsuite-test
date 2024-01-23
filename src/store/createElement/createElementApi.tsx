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
        getCreatedElement: builder.mutation({
            query: ()=> ({
                url: "/elements",
                method: "GET",
            })
        }),
       fetchLookUp: builder.mutation({
            query: (id) => ({
                url: `/lookups/${id}/lookupvalues`,
                method: "GET",
            })
        }),
      fetchCategoryAndClassification: builder.query<any,{lookupId: number; lookupValueId: number }>({
      query: ({ lookupId, lookupValueId }) =>
        `lookups/${lookupId}/lookupvalues/${lookupValueId}`,
    }),
    }),
});


export const { useCreateElementMutation,
    useGetCreatedElementMutation,
        useFetchLookUpMutation,
        useFetchCategoryAndClassificationQuery
} = createElementApi;