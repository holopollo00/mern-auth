import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPart: null,
  loading: false,
  error: false,
};

const partSlice = createSlice({
  name: "part",
  initialState,
  reducers: {
    setCurrentPart: (state, action) => {
      state.currentPart = action.payload;
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

export const { setCurrentPart, setLoading, setError } = partSlice.actions;

export default partSlice.reducer;
