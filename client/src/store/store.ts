"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";


const rootReducer = combineReducers({
  counter: counterReducer,
},);

export const store = configureStore({
  reducer: rootReducer,

});

export type RootState = ReturnType<typeof rootReducer>;