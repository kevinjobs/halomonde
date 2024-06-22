import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/couter.slice";
import userSlice from "./slices/user.slice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
