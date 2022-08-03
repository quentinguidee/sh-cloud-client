import classNames from "classnames";
import React from "react";

import LogoLightModePNG from "Assets/Images/LogoLightMode.png";
import LogoDarkModePNG from "Assets/Images/LogoDarkMode.png";

import styles from "./Logo.module.sass";
import { Text } from "Components/Text/Text";
import Layout from "Components/Layout/Layout";
import { useTheme } from "Store/Hooks/useTheme";

type Props = React.HTMLProps<HTMLDivElement> & {
    // Small hides the text
    small?: boolean;
};

function Logo(props: Props) {
    const { className, small, ...others } = props;

    const theme = useTheme();

    return (
        <Layout
            horizontal
            center
            middle
            gap={12}
            {...others}
            className={classNames(styles.logo, className)}
        >
            <img
                alt="Logo"
                src={
                    theme.current === "light"
                        ? LogoLightModePNG
                        : LogoDarkModePNG
                }
                className={styles.image}
            />
            {!small && <Text>cloud.sh</Text>}
        </Layout>
    );
}

export default Logo;
