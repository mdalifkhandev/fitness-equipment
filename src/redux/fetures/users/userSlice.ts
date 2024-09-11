// import { RootState } from '@/redux/store';
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//  name:null,
//  email:null,
//  phone:null,
//  dividion:null,
//  distric:null,
//  upzala:null,
//  address:null
// };

// const userInfo = createSlice({
//   name: 'userInfo',
//   initialState,
//   reducers: {
//     setUserInfo: (state, action) => {
//       // const { name,email,phone,dividion,distric,upzala,address } = action.payload;
//       const { email } = action.payload;
//       // state.name = name;
//       state.email = email;
//       // state.phone = phone;
//       // state.dividion = dividion;
//       // state.distric = distric;
//       // state.upzala = upzala;
//       // state.address = address;
//     },
//     // userInfoReset: state => {
//     //   state.name = null;
//     //   state.email = null;
//     //   state.phone = null;
//     //   state.dividion = null;
//     //   state.distric = null;
//     //   state.upzala = null;
//     //   state.address = null;
//     // },
//   },
// });

// export const { setUserInfo} = userInfo.actions;

// export default userInfo.reducer;

// export const useCurrentUserInfo = (state: RootState) => state.UserInfo;
// console.log(setUserInfo);

import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  email: null,
  phone: null,
  dividion: null,
  distric: null,
  upzala: null,
  address: null,
};

const userSlice = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { email } = action.payload;
      state.email = email;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;

export const useCurrentUserInfo = (state: RootState) => state.UserInfo;
