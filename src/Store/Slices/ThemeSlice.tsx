import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "Store/Store";
import { ThemeSettings } from "Models/ThemeSettings";

function setLightPaletteReducer(state, action: PayloadAction<string>) {
    const { payload: palette } = action;
    state.light = palette;
}

function setDarkPaletteReducer(state, action: PayloadAction<string>) {
    const { payload: palette } = action;
    state.dark = palette;
}

function toggleThemeReducer(state) {
    state.current = state.current === "light" ? "dark" : "light";
}

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        light: "Catppuccin Latte",
        dark: "Catppuccin Mocha",
        current: "light",
    } as ThemeSettings,
    reducers: {
        setLightPalette: setLightPaletteReducer,
        setDarkPalette: setDarkPaletteReducer,
        toggleTheme: toggleThemeReducer,
    },
});

export const { setLightPalette, setDarkPalette, toggleTheme } =
    themeSlice.actions;

export const getTheme = (state: StoreState) => state.theme;

export default themeSlice.reducer;
