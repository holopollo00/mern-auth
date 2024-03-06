import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDesign: null,
  loading: false,
  error: false,
};

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    setCurrentDesign: (state, action) => {
      state.currentDesign = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentDesign, setLoading, setError } = designSlice.actions;

export default designSlice.reducer;
