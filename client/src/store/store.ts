"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import applicationStateReducer from "./slices/applicationState";


const rootReducer = combineReducers({
  applicationState: applicationStateReducer,
},);

export const store = configureStore({
  reducer: rootReducer,

});

export type RootState = ReturnType<typeof rootReducer>;