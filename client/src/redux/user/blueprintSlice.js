import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBlueprint: null,
  loading: false,
  error: false,
};

const blueprintSlice = createSlice({
  name: "blueprint",
  initialState,
  reducers: {
    setCurrentBlueprint: (state, action) => {
      state.currentBlueprint = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearBlueprint: (state) => {
      state.currentBlueprint = null;
      state.loading = false;
      state.error = false;
    }
  },
});

export const { setCurrentBlueprint, setLoading, setError, clearBlueprint } = blueprintSlice.actions;

export default blueprintSlice.reducer;
