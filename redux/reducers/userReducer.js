import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUsers", () => {
  return axios("https://jsonplaceholder.typicode.com/users").then(
    (response) => {
      return response.data;
    }
  );
});

// Initial state
const initialState = {
  loading: false,
  users: [],
  error: "",
};

const pending = (state, action) => {
  state.loading = true;
};

const fulfilled = (state, action) => {
  state.loading = false;
  state.users = action.payload;
  state.error = "";
};

const error = (state, action) => {
  state.loading = false;
  state.users = [];
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
