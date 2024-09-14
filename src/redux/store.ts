import { configureStore } from '@reduxjs/toolkit';
import authReducer from './fetures/auth/authSlice';
import UserInfoReducer from './fetures/users/userSlice';
import ProductsCheakoutReducer from './fetures/products/productsSlice';
import MyCardReducer from './fetures/mycard/cardSlice';
import { baseApi } from './api/baseApi';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { paymentReducer } from './fetures/orderData/payment/paymentReducer';

const presistConfig = {
  key: `auth`,
  storage,
};
const presistConfigUserInfo = {
  key: `UserInfo`,
  storage,
};
const presistConfigProductsInfo = {
  key: `ProductsInfo`,
  storage,
};
const presistConfigMyCard = {
  key: `mycard`,
  storage,
};

const persistAuthReducer = persistReducer(presistConfig, authReducer);
const persistUserInfoReducer = persistReducer(
  presistConfigUserInfo,
  UserInfoReducer,
);
const persistProductsInfoReducer = persistReducer(
  presistConfigProductsInfo,
  ProductsCheakoutReducer,
);
const persistMyCardReducer = persistReducer(
  presistConfigMyCard,
  MyCardReducer,
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistAuthReducer,
    UserInfo: persistUserInfoReducer,
    ProductsInfo: persistProductsInfoReducer,
    payment: paymentReducer,
    MyCard:persistMyCardReducer
  },
  middleware: getDefaultMiddlewares =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
