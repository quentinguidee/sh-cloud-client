import CatppuccinLatte from "./CatppuccinLatte.json";
import CatppuccinFrappe from "./CatppuccinFrappé.json";
import CatppuccinMacchiato from "./CatppuccinMacchiato.json";
import CatppuccinMocha from "./CatppuccinMocha.json";

const palettes = [
    CatppuccinLatte,
    CatppuccinFrappe,
    CatppuccinMacchiato,
    CatppuccinMocha,
];

export const getCSSPalette = (name?: string, dark?: boolean) => {
    let colors;

    palettes.forEach((p) => {
        if (p.name === name) {
            colors = p.colors;
        }
    });

    if (colors) return colors;

    return dark ? CatppuccinLatte.colors : CatppuccinMocha.colors;
};

export const getAllPalettes = (dark?: boolean) => {
    if (dark !== undefined) return palettes.filter((p) => p.dark === dark);
    return palettes;
};
