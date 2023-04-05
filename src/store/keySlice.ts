import { createSlice } from "@reduxjs/toolkit";
import { InitialKeyState } from "../utils/types";

const initialState: InitialKeyState = {
  apiKey: "",
};

export const keySlice = createSlice({
  name: "key",
  initialState,
  reducers: {
    setKey: (state, action) => {
      state.apiKey = action.payload;
    },
  },
});

export const { setKey } = keySlice.actions;
export default keySlice.reducer;
