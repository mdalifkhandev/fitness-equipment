import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsName: null,
  productId: null,
  price: null,
  quentity: null,
  images: null,
  catagory: null,
  discount: null,
};

const productsSlice = createSlice({
  name: 'ProductsCheakout',
  initialState,
  reducers: {
    setProductsCheakout: (state, action) => {
      const { productId, quentity } = action.payload;
      state.productId = productId;
      state.quentity = quentity;
    },
  },
});

export const { setProductsCheakout } = productsSlice.actions;

export default productsSlice.reducer;

export const useCurrentProductsInfo = (state: RootState) => state.ProductsInfo;
