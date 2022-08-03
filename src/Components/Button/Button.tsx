import classNames from "classnames";
import Layout from "Components/Layout/Layout";
import React from "react";

import styles from "./Button.module.sass";

type Props = React.HTMLProps<HTMLDivElement> & {
    primary?: boolean;
    secondary?: boolean;
    onlySymbol?: boolean;
    sharp?: boolean;
    big?: boolean;
};

function Button(props: Props) {
    const {
        children,
        className,
        disabled,
        secondary,
        onlySymbol,
        sharp,
        big,
        ...others
    } = props;

    return (
        <Layout
            horizontal
            center
            gap={6}
            className={classNames({
                [styles.button]: true,
                [styles.buttonSecondary]: secondary,
                [styles.buttonOnlySymbol]: onlySymbol,
                [styles.buttonDisabled]: disabled,
                [styles.buttonSharp]: sharp,
                [styles.buttonBig]: big,
                [className]: true,
            })}
            {...others}
        >
            {children}
        </Layout>
    );
}

export default Button;
