"use client"; 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: 0,
  profilePageActive: 0,
  musicPageActive: 'explore',
  openSearchResult: false,
  searchType: 'track',
  groupName: '',
  encodedGroupId: '',
  displayName: '',
  currentTrackId: '',
  playMusic: false,
  musicDisabled: false,
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
    },

    setOpenSearchResult: (state, action) => {
      state.openSearchResult = action.payload;
    },

    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },

    setGroupName: (state, action) => {
      state.groupName = action.payload
    },

    setGroupId: (state, action) => {
      state.encodedGroupId = action.payload;
    },

    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },

    setTrackId: (state, action) => {
      state.currentTrackId = action.payload;
    },

    setPlayMusic: (state, action) => {
      state.playMusic = action.payload;
    },

    setMusicDisabled: (state, action) => {
      state.musicDisabled = action.payload;
    },
  },
});

export const { 
              toggleMode, 
              setProfilePageActive, 
              setMusicPageActive, 
              setOpenSearchResult, 
              setSearchType,
              setGroupName,
              setGroupId,
              setDisplayName,
              setTrackId,
              setPlayMusic,
              setMusicDisabled,
             } = applicationState.actions

export default applicationState.reducer;