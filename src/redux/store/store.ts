import { configureStore } from "@reduxjs/toolkit";
import membershipSignupReducer from "../slices/membershipSignupSlice";

export const store = configureStore({
  reducer: {
    membership: membershipSignupReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
