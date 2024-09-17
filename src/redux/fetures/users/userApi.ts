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
    createUserInfo: builder.mutation({
      query: userInfo => {
        return {
          url: '/users/cteate-user-info',
          method: 'POST',
          body: userInfo,
        };
      },
    }),
    getUserInfo: builder.query({
      query: ({ email }) => {
        return {
          url: `/users/user-info?email=${email}`,
          method: 'GET',
        };
      },
    }),
    getUser: builder.query({
      query: ({ email }) => {
        return {
          url: `/users/user?email=${email}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useCreateUserInfoMutation,
  useGetUserInfoQuery,
  useGetUserQuery,
} = userhApi;
