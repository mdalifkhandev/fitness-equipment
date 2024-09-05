import { baseApi } from '@/redux/api/baseApi';

const productsAPI = baseApi.injectEndpoints({
  endpoints: builders => ({
    getProducts: builders.query({
      query: ({ catagory, search , minPrice, maxPrice}) => {
        console.log(catagory, search, minPrice, maxPrice);

        return {
          // url: `/products`,
          url: `/products?catagory=${catagory}&name=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
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
