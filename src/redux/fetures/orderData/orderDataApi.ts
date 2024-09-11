import { baseApi } from '@/redux/api/baseApi';

const orderDataApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createOrderData: builder.mutation({
      query: orderData => {
        console.log(orderData);

        return {
          url: '/order/create-data',
          method: 'POST',
          body: orderData,
        };
      },
    }),
  }),
});

export const { useCreateOrderDataMutation } = orderDataApi;
