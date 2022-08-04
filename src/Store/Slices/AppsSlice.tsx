import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "Store/Store";
import { App } from "Models/App";

function pushAppReducer(state, action: PayloadAction<App>) {
    const { payload: app } = action;
    state.push(app);
}

function removeAppReducer(state, action: PayloadAction<App>) {
    const { payload: app } = action;
    return state.filter((_app) => _app.name !== app.name);
}

const appsSlice = createSlice({
    name: "apps",
    initialState: [] as App[],
    reducers: {
        pushApp: pushAppReducer,
        removeApp: removeAppReducer,
    },
});

export const { pushApp, removeApp } = appsSlice.actions;

export const getApps = (state: StoreState) => state.apps;

export default appsSlice.reducer;
