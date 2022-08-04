import React from "react";
import classNames from "classnames";

import styles from "./Text.module.sass";

type Props = React.HTMLProps<HTMLSpanElement>;

function Text(props: Props) {
    const { className, ...others } = props;
    return <span className={className} {...others} />;
}

function Caption(props: Props) {
    const { className, ...others } = props;
    return (
        <span className={classNames(styles.caption, className)} {...others} />
    );
}

export { Text, Caption };
