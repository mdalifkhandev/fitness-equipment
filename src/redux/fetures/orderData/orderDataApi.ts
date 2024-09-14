import { baseApi } from '@/redux/api/baseApi';

const orderDataApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createOrderData: builder.mutation({
      query: orderData => {
        return {
          url: '/order/create-data',
          method: 'POST',
          body: orderData,
        };
      },
    }),
    paymentIntentPrice: builder.mutation({
      query: price => {
        console.log(price);
        
        return {
          url: '/order/payment-intent',
          method: 'POST',
          body: price,
        };
      },
    }),
  }),
});

export const { useCreateOrderDataMutation,usePaymentIntentPriceMutation } = orderDataApi;
