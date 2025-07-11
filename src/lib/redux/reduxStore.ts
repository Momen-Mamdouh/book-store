import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from '@/lib/redux/UserSlice/UserSlice'
import booksSliceReducer from '@/lib/redux/BooksSlice/BooksSlice'
import LoaderStoreReducer from '@/lib/redux/LoaderSlice/loaderSlice'
import CartStoreReducer from '@/lib/redux/CartSlice/CartSlice'
import WishListStoreReducer from '@/lib/redux/WishListSlice/WishListSlice'
import OrderReducer from '@/lib/redux/OrdersSlice/OrdersSlice'
import loaderMiddleware from '@/lib/redux/loaderMiddleware'

const store = configureStore({

  reducer: {
    userStore:userSliceReducer,
    bookStore:booksSliceReducer,
    loaderStore:LoaderStoreReducer,
    cartStore:CartStoreReducer,
    wishListStore:WishListStoreReducer,
    orderStore:OrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loaderMiddleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
