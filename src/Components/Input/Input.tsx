import React, { Ref } from "react";

import styles from "./Input.module.sass";
import classNames from "classnames";
import Layout from "Components/Layout/Layout";

type Props = React.HTMLProps<HTMLInputElement> & {
    small?: boolean;
    label?: string;
};

function Input(props: Props, ref: Ref<HTMLInputElement>) {
    const { className, small, label, name, ...others } = props;
    return (
        <Layout vertical stretch gap={8}>
            {label && (
                <label className={styles.label} htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                ref={ref}
                name={name}
                className={classNames({
                    [styles.input]: true,
                    [styles.inputSmall]: small,
                    [styles.inputDisabled]: props.disabled,
                    [className]: true,
                })}
                {...others}
            />
        </Layout>
    );
}

export default React.forwardRef(Input);
