import { configureStore } from '@reduxjs/toolkit'
import MainReducerApp from "../Reducer/MainReducer";

export const StoreRedux = configureStore({
  reducer: {
    MainReducerApp
  }, 
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})


