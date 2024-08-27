import { baseApi } from '@/redux/api/baseApi';

const createAddToCard = baseApi.injectEndpoints({
  endpoints: builder => ({
    createAddToCard: builder.mutation({
      query: data => {
        console.log(data);

        return {
          url: `/products/addtocard`,
          method: 'POST',
          body: data,
          //     headers: {
          //     'Content-Type': 'application/json'
          //   }
        };
      },
    }),
  }),
});

export const { useCreateAddToCardMutation } = createAddToCard;
