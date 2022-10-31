import { createSlice } from "@reduxjs/toolkit";
import { fetchPartys } from "./reducer";

// Initial state
const initialState = {
  loading: false,
  data: [],
  error: "",
  editParty: {},
  editCuttingType: {},
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
  reducers: {
    editParty: (state, action) => {
      state.editParty = { ...state.editParty, ...action.payload };
    },
    editCuttingType: (state, action) => {
      state.editCuttingType = { ...state.editCuttingType, ...action.payload };
    },
    updateCuttingTypeObj: (state, action) => {
      const payload = action.payload;
      console.log(payload);
      if (payload.length) {
        payload.forEach((d, i) => {
          // state.editCuttingType[i] = d;
          Object.values(state.editCuttingType).forEach((data, idx) => {
            if (data.c_id == d.c_id) {
              state.editCuttingType[idx] = d;
            }
          });
        });

        console.log("state.editCuttingType", state.editCuttingType);

        // state.editCuttingType = { ...state.editCuttingType, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPartys.pending, pending);
    builder.addCase(fetchPartys.fulfilled, fulfilled);
    builder.addCase(fetchPartys.rejected, error);
  },
});

export const { editParty, editCuttingType, updateCuttingTypeObj } =
  partySlice.actions;

export default partySlice.reducer;
