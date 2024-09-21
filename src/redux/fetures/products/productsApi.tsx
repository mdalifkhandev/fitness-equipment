import { baseApi } from '@/redux/api/baseApi';

const productsAPI = baseApi.injectEndpoints({
  endpoints: builders => ({
    getProducts: builders.query({
      query: ({ catagory, search, minPrice, maxPrice }) => {
        return {
          // url: `/products`,
          url: `/products?catagory=${catagory}&name=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
          method: 'GET',
        };
      },
      // providesTags : ['products'],
    }),
    getSingleProducts: builders.query({
      query: params => {
        return {
          url: `/products/${params}`,
          method: 'GET',
          params: params,
        };
      },
    }),
    getProductsCatagore: builders.query({
      query: () => ({
        url: `/products/catagore`,
        method: 'GET',
      }),
    }),
    deleteProducts: builders.mutation({
      query: ({ id }) => {
        return {
          url: `/products/products-deleted?id=${id}`,
          method: 'DELETE',
        };
      },
    }),
    updathProducts: builders.mutation({
      query: ({id,userInfo}) => {
        return {
          url: `/products/updath-products?id=${id}`,
          method: 'PUT',
          body:userInfo
        };
      },
    }),
    createProducts: builders.mutation({
      query: ({productData}) => {
        console.log(productData);
        
        return {
      url: `/products/create-products`,
      method: 'POST',
      body: productData,  
    };
      },
    }),
    //
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductsQuery,
  useGetProductsCatagoreQuery,
  useDeleteProductsMutation,
  useUpdathProductsMutation,
  useCreateProductsMutation
} = productsAPI;
