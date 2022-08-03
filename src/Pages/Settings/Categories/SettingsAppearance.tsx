import React from "react";
import TitleBar from "Layouts/TitleBar/TitleBar";
import Layout from "Components/Layout/Layout";
import ColorPalette from "Components/ColorPalette/ColorPalette";
import { getAllPalettes } from "Assets/palettes/Palettes";
import { Subtitle } from "Components/Title/Title";
import { useTheme } from "Store/Hooks/useTheme";
import { useDispatch } from "react-redux";
import {
    setDarkPalette,
    setLightPalette,
    toggleTheme,
} from "Store/Slices/ThemeSlice";

function SettingsProfile() {
    const dispatch = useDispatch();

    const theme = useTheme();

    const getColorPalettes = (dark: boolean) =>
        getAllPalettes(dark).map((palette) => {
            const selected =
                theme.light === palette.name || theme.dark === palette.name;

            const switchTheme = () => {
                const current = theme.current === "dark";
                if (palette.dark !== current) dispatch(toggleTheme());
                if (dark) {
                    dispatch(setDarkPalette(palette.name));
                } else {
                    dispatch(setLightPalette(palette.name));
                }
            };

            return (
                <ColorPalette
                    key={palette.name}
                    name={palette.name}
                    selected={selected}
                    onClick={switchTheme}
                    colors={[
                        palette.colors["--background-primary"],
                        palette.colors["--text-primary"],
                        palette.colors["--accent"],
                        palette.colors["--background-red"],
                        palette.colors["--background-orange"],
                        palette.colors["--background-blue"],
                    ]}
                />
            );
        });

    return (
        <React.Fragment>
            <TitleBar title="Appearance" />
            <Layout vertical left gap={24}>
                <Layout vertical left gap={12}>
                    <Subtitle>Light theme</Subtitle>
                    {getColorPalettes(false)}
                </Layout>
                <Layout vertical left gap={12}>
                    <Subtitle>Dark theme</Subtitle>
                    {getColorPalettes(true)}
                </Layout>
            </Layout>
        </React.Fragment>
    );
}

export default SettingsProfile;
