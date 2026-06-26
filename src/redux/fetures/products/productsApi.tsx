import { baseApi } from '@/redux/api/baseApi';

const productsAPI = baseApi.injectEndpoints({
  endpoints: builders => ({
    getProducts: builders.query({
      query: ({ catagory, search, minPrice, maxPrice }) => {
        const params = new URLSearchParams();
        if (catagory && catagory !== 'undefined') params.append('catagory', catagory);
        if (search && search !== 'undefined') params.append('name', search);
        if (minPrice && minPrice !== 'undefined') params.append('minPrice', minPrice.toString());
        if (maxPrice && maxPrice !== 'undefined') params.append('maxPrice', maxPrice.toString());
        return {
          url: `/products?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['products'],
    }),
    getSingleProducts: builders.query({
      query: params => {
        return {
          url: `/products/${params}`,
          method: 'GET',
        };
      },
    }),
    getProductsCheakOut: builders.query({
      query: param => {
        return {
          url: `/products/cheakout-page?ids=${param}`,
          method: 'GET',
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
      query: ({ id, userInfo }) => {
        return {
          url: `/products/updath-products?id=${id}`,
          method: 'PUT',
          body: userInfo,
        };
      },
    }),
    createProducts: builders.mutation({
      query: ({ productData }) => {
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
  useCreateProductsMutation,
  useGetProductsCheakOutQuery,
} = productsAPI;
