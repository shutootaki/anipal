import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import channelReducer from "../store/channelSlice";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;