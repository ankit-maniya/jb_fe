import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../services/user.service";

export const fetchUser = createAsyncThunk(
  "user/fetchUsers",
  async (formData) => {
    const response = await UserService.get(formData);
    localStorage.setItem("token", response.data.token.access);
    return response.data;
  }
);
