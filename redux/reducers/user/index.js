import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./reducer";

// Initial state
const initialState = {
  loading: false,
  user: {},
  error: "",
};

const pending = (state, action) => {
  state.loading = true;
};

const fulfilled = (state, action) => {
  state.loading = false;
  state.user = action.payload;
  state.error = "";
};

const error = (state, action) => {
  state.loading = false;
  state.user = {};
  state.error = action.error;
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, pending);
    builder.addCase(fetchUser.fulfilled, fulfilled);
    builder.addCase(fetchUser.rejected, error);
  },
});

export default userSlice.reducer;
