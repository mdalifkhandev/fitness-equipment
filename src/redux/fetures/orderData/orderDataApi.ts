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
        return {
          url: '/order/payment-intent',
          method: 'POST',
          body: price,
        };
      },
    }),
    getOrderData: builder.query({
      query: ({ email }) => {
        return {
          url: `/order/get-order-data?email=${email}`,
          method: 'GET',
        };
      },
    }),
    getCancelOrderData: builder.query({
      query: ({ email }) => {
        return {
          url: `/order/get-cancel-data?email=${email}`,
          method: 'GET',
        };
      },
    }),
    deletedOrderData: builder.mutation({
      query: id => {
        return {
          url: `/order/cancel-order?id=${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useCreateOrderDataMutation,
  usePaymentIntentPriceMutation,
  useGetOrderDataQuery,
  useDeletedOrderDataMutation,
  useGetCancelOrderDataQuery,
} = orderDataApi;
