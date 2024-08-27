import { baseApi } from '@/redux/api/baseApi';

const productsAPI = baseApi.injectEndpoints({
  endpoints: builders => ({
    getProducts: builders.query({
      query: ({ catagory, search }) => {
        console.log(catagory, search);

        return {
          // url: `/products`,
          url: `/products?catagory=${catagory}&name=${search}`,
          method: 'GET',
        };
      },
      // providesTags : ['products'],
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
