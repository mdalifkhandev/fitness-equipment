/* eslint-disable @typescript-eslint/no-unused-expressions */
import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  quentity: {},
};

const productsSlice = createSlice({
  name: 'ProductsCheakout',
  initialState,
  reducers: {
    setProductsCheakout: (state, action) => {
      const { ids, quentity } = action.payload;
      (state.ids = ids), (state.quentity = quentity);
    },
  },
});

export const { setProductsCheakout } = productsSlice.actions;

export default productsSlice.reducer;

export const useCurrentProductsInfo = (state: RootState) => state.ProductsInfo;
