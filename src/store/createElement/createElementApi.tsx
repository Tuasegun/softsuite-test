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
        `/lookups/${lookupId}/lookupvalues/${lookupValueId}`,
    }),
    fetchElementLinks: builder.query<any, any>({
        query: (id) => `/elements/${id}/elementlinks`,
      }),
      fetchElementDetails: builder.query<any, any>({
        query: (id) => `/elements/${id}`,
      }),
      fetchSubOrganization: builder.mutation({
        query: ()=> ({
            url: "/suborganizations",
            method: "GET",
        })
      }),
      fetchDepartmentQuery: builder.mutation<any, any>({
        query: (id) => `/suborganizations/${id}/departments`
      }),
      fetchGrade : builder.mutation({
        query: ()=> ({
            url: "/grade",
            method: "GET",
        })
      }),
      fetchGradeStep: builder.mutation({
        query: (id)=> ({
            url: `/grade/${id}/gradesteps`,
            method: "GET",
        })
      }),
      createElementLink: builder.mutation({
        query: ({body, id}) => ({
            url: `/elements/${id}/elementlinks`,
            method: "POST",
            body: body,
        }),
      }),
      fetchSubOrg: builder.query<any, any>({
        query: (id) => `/suborganizations/${id}`,
      }),
      fetchDepartment: builder.query<any, any>({
        query: ({ suborganizationId, id }) =>
          `suborganizations/${suborganizationId}/departments/${id}`,
      }),
    }),
});


export const { useCreateElementMutation,
    useGetCreatedElementMutation,
        useFetchLookUpMutation,
        useFetchCategoryAndClassificationQuery,
        useFetchElementLinksQuery,
        useFetchElementDetailsQuery,
        useFetchSubOrganizationMutation,
        useFetchDepartmentQueryMutation,
        useFetchGradeMutation,
        useFetchGradeStepMutation,
        useCreateElementLinkMutation,
        useFetchSubOrgQuery,
        useFetchDepartmentQuery,
} = createElementApi;