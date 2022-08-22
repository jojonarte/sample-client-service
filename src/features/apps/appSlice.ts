import { createSlice } from "@reduxjs/toolkit";
import { App } from "./appsApi";

export interface AppState {
    apps: App[];
}

const initialState: AppState = {
    apps: [],
}

export const appsSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {},
})
