"use client"; 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: 1,
  profilePageActive: 0,
};

export const applicationState = createSlice({
  name: "applicationState",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.theme = state.theme === 0 ? 1 : 0;
    },

    setProfilePageActive: (state, action) => {
      state.profilePageActive = action.payload
    }
  },
});

export const { toggleMode, setProfilePageActive } = applicationState.actions

export default applicationState.reducer;