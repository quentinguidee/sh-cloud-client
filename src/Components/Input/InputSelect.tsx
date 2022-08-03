import React from "react";
import styles from "Components/Input/Input.module.sass";
import Layout from "Components/Layout/Layout";
import classNames from "classnames";

type ItemProps = React.HTMLProps<HTMLOptionElement>;

export function InputSelectItem(props: ItemProps) {
    return <option {...props} />;
}

type Props = React.HTMLProps<HTMLSelectElement> & {
    label: string;
};

function InputSelect(props: Props) {
    const { label, name, children, ...others } = props;
    return (
        <Layout vertical stretch gap={8}>
            {label && (
                <label className={styles.label} htmlFor={name}>
                    {label}
                </label>
            )}
            <select
                name={name}
                className={classNames(styles.input, styles.select)}
                {...others}
            >
                <InputSelectItem />
                {children}
            </select>
        </Layout>
    );
}

export default InputSelect;
