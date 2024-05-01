"use client"; 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: 0,
  profilePageActive: 0,
  musicPageActive: 'explore',
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
    },

    setMusicPageActive: (state, action) => {
      state.musicPageActive = action.payload;
    }
  },
});

export const { toggleMode, setProfilePageActive, setMusicPageActive } = applicationState.actions

export default applicationState.reducer;