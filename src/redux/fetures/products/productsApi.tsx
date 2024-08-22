import { baseApi } from '@/redux/api/baseApi';

const productsAPI = baseApi.injectEndpoints({
  endpoints: builders => ({
    getProducts: builders.query({
      query: args => ({
        url: `/products?${args}`,
        method: 'GET',
      }),
    }),
    getSingleProducts: builders.query({
      query: params => ({
        url: `/products/${params}`,
        method: 'GET',
        params: params,
      }),
    }),
    getProductsCatagore: builders.query({
      query: () => ({
        url: `/products/catagore`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductsQuery,
  useGetProductsCatagoreQuery,
} = productsAPI;
