import { baseApi } from '@/redux/api/baseApi';

const authApi = baseApi.injectEndpoints({
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

export const { useCreateUserMutation } = authApi;
