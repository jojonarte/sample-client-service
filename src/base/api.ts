import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'src/app/store';

export interface ApiResponse {
  success: boolean;
  message?: string;
  errorCode?: string;
  data: Record<string, unknown>;
}

const baseQuery =  fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
})

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    register: builder.mutation({
      query: body => ({
        url: 'users',
        method: 'POST',
        body,
      })
    }),
    login: builder.mutation({
      query: body => ({
        url: 'sessions/init',
        method: 'POST',
        body,
      })
    }),
    insertApp: builder.mutation({
      query: body => ({
        url: 'apps',
        method: 'POST',
        body
      })
    }),
    patchApp: builder.mutation({
      query: body => ({
        url: 'apps',
        method: 'PATCH',
        body,
      })
    }),
    deleteApp: builder.mutation({
      query: ({ id }) => ({
        url: `apps/${id}`,
        method: 'DELETE',
      })
    }),
    listApps: builder.query({
      query: () => ({
        url: 'apps',
        method: 'GET'
      })
    })
  })
})

export const {
  useLazyListAppsQuery,
  useRegisterMutation,
  useLoginMutation,
  useInsertAppMutation,
  usePatchAppMutation,
  useDeleteAppMutation,
  useListAppsQuery
} = rootApi