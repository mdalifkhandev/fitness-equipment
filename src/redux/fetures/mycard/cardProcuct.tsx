import { baseApi } from '@/redux/api/baseApi';

const createAddToCard = baseApi.injectEndpoints({
  endpoints: builder => ({
    createAddToCard: builder.mutation({
      query: data => {
        return {
          url: `/products/addtocard`,
          method: 'POST',
          body: data,
        };
      },
    }),
    getAddToCard: builder.query({
      query: ({ email }) => {
        return {
          url: `/products/addtocard?email=${email}`,
          method: 'GET',
        };
      },
      providesTags: ['products'],
    }),
    removeToCard: builder.mutation({
      query: id => {
        return {
          url: `/products/addtocard/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useCreateAddToCardMutation,
  useGetAddToCardQuery,
  useRemoveToCardMutation,
} = createAddToCard;
