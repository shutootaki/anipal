import { createSlice } from "@reduxjs/toolkit";
import { InitialUserState } from "../utils/types";

const initialState: InitialUserState = {
  user: null,
  photo: undefined,
  displayName: "",
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { startLoading, login, logout } = userSlice.actions;
export default userSlice.reducer;
