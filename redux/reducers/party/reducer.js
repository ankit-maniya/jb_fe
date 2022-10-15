import { createAsyncThunk } from "@reduxjs/toolkit";
import PartyService from "../../../services/party.service";

export const fetchPartys = createAsyncThunk(
  "user/fetchPartys",
  async (formData) => {
    const response = await PartyService.get(formData);
    // localStorage.setItem("token", response.data.token.access);
    return response.results;
  }
);
