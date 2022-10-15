import { createSlice } from "@reduxjs/toolkit";
import { fetchPartys } from "./reducer";

// Initial state
const initialState = {
  loading: false,
  data: [],
  error: "",
};

const pending = (state, action) => {
  state.loading = true;
};

const fulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
  state.error = "";
};

const error = (state, action) => {
  state.loading = false;
  state.data = [];
  state.error = action.error;
};

// Actual Slice
export const partySlice = createSlice({
  name: "partys",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPartys.pending, pending);
    builder.addCase(fetchPartys.fulfilled, fulfilled);
    builder.addCase(fetchPartys.rejected, error);
  },
});

export default partySlice.reducer;
