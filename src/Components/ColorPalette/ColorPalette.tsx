import React from "react";

import styles from "./ColorPalette.module.sass";
import Layout from "Components/Layout/Layout";
import { Text } from "Components/Text/Text";
import classNames from "classnames";
import Symbol from "Components/Symbol/Symbol";

type ColorProps = {
    color: string;
};

function Color(props: ColorProps) {
    const { color } = props;
    return <div className={styles.color} style={{ backgroundColor: color }} />;
}

type Props = {
    name?: string;
    colors: string[];
    selected?: boolean;
    onClick?: () => void;
};

function ColorPalette(props: Props) {
    const { colors, name, selected, onClick } = props;

    const symbol = selected ? "radio_button_checked" : "radio_button_unchecked";

    return (
        <Layout
            horizontal
            center
            onClick={onClick}
            className={classNames({
                [styles.palette]: true,
                [styles.paletteSelected]: selected,
            })}
            gap={12}
        >
            <Symbol symbol={symbol} />
            <div className={styles.title}>
                <Text>{name}</Text>
            </div>
            <Layout horizontal center className={styles.colors}>
                {colors.map((color) => (
                    <Color key={color} color={color} />
                ))}
            </Layout>
        </Layout>
    );
}

export default ColorPalette;
