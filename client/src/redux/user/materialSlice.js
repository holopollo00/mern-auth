// In your selectedMaterialsSlice.js file
import { createSlice } from "@reduxjs/toolkit";

export const selectedMaterialsSlice = createSlice({
  name: "selectedMaterials",
  initialState: [],
  reducers: {
    updateMaterial: (state, action) => {
      const updatedMaterial = action.payload;
      const existingIndex = state.findIndex(
        (material) => material.item === updatedMaterial.item
      );
      if (existingIndex !== -1) {
        state[existingIndex] = updatedMaterial;
      } else {
        state.push(updatedMaterial);
      }
    },
  },
});

export const { updateMaterial } = selectedMaterialsSlice.actions;

export default selectedMaterialsSlice.reducer;
