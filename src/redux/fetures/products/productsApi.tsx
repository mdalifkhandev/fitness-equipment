import { baseApi } from "@/redux/api/baseApi";

const productsAPI=baseApi.injectEndpoints({
   endpoints:builders=>({
    getProducts:builders.query({
        query:()=>({
            url:'/products',
            method:'GET'
        })
    })
   }) 
})

export const {useGetProductsQuery}=productsAPI


// import { baseApi } from '@/redux/api/baseApi';

// const authApi = baseApi.injectEndpoints({
//   endpoints: builder => ({
//     createUser: builder.mutation({
//       query: userInfo => ({
//         url: '/users/cteate-user',
//         method: 'POST',
//         body: userInfo,
//       }),
//     }),
//   }),
// });

// export const { useCreateUserMutation } = authApi;