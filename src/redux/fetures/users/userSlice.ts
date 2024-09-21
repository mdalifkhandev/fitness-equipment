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
