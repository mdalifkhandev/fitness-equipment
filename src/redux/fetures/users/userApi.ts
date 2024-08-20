import { baseApi } from '@/redux/api/baseApi';

const userhApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation({
      query: userInfo => ({
        url: '/users/cteate-user',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userhApi;
