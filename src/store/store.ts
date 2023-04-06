import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import channelReducer from "../store/channelSlice";
import keyReducer from "../store/keySlice";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    key: keyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
