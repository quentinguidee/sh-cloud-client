import React, { forwardRef, HTMLProps, PropsWithChildren, Ref } from "react";

import styles from "./Input.module.sass";
import Layout from "Components/Layout/Layout";
import classNames from "classnames";

type Props = PropsWithChildren<{
    label?: string;
    name: string;
}>;

function Input(props: Props) {
    const { label, name, children } = props;

    return (
        <Layout vertical stretch gap={8}>
            {label && (
                <label className={styles.label} htmlFor={name}>
                    {label}
                </label>
            )}
            {children}
        </Layout>
    );
}

type InputFieldProps = Props &
    HTMLProps<HTMLInputElement> & {
        small?: boolean;
    };

export const InputField = forwardRef(function (
    props: InputFieldProps,
    ref: Ref<HTMLInputElement>,
) {
    const { name, small, label, className, ...others } = props;

    return (
        <Input name={name} label={label}>
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
        </Input>
    );
});

type InputAreaProps = Props &
    HTMLProps<HTMLTextAreaElement> & {
        fixedWidth?: boolean;
    };

export const InputArea = forwardRef(function (
    props: InputAreaProps,
    ref: Ref<HTMLTextAreaElement>,
) {
    const { name, fixedWidth, label, className, ...others } = props;

    return (
        <Input name={name} label={label}>
            <textarea
                ref={ref}
                name={name}
                className={classNames({
                    [styles.input]: true,
                    [styles.inputFixedWidth]: fixedWidth,
                    [styles.inputDisabled]: props.disabled,
                    [className]: true,
                })}
                {...others}
            />
        </Input>
    );
});

type InputSelectProps = Props & HTMLProps<HTMLSelectElement>;

export const InputSelect = forwardRef(function (
    props: InputSelectProps,
    ref: Ref<HTMLSelectElement>,
) {
    const { name, label, children, ...others } = props;

    return (
        <Input name={name} label={label}>
            <select
                name={name}
                className={classNames(styles.input, styles.select)}
                {...others}
            >
                <InputSelectItem />
                {children}
            </select>
        </Input>
    );
});

type ItemProps = React.HTMLProps<HTMLOptionElement>;

export function InputSelectItem(props: ItemProps) {
    return <option {...props} />;
}
