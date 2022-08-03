import { useSelector } from "react-redux";
import { getTheme } from "Store/Slices/ThemeSlice";
import { useMemo } from "react";
import { ThemeSettings } from "Models/ThemeSettings";

export const useTheme = () => {
    const theme = useSelector(getTheme);
    return useMemo<ThemeSettings>(() => theme, [theme]);
};
