import React from "react";
import Box from "Components/Box/Box";

import styles from "./MessageBox.module.sass";
import { Text } from "Components/Text/Text";
import { Message } from "Models/Message";
import Symbol from "Components/Symbol/Symbol";
import Close from "Components/Close/Close";
import { useDispatch } from "react-redux";
import { removeMessage } from "Store/Slices/MessagesSlice";
import Spacer from "Components/Spacer/Spacer";
import classNames from "classnames";
import Layout from "Components/Layout/Layout";

type Props = {
    message: Message;
    className?: string;
};

function MessageBox(props: Props) {
    const { className } = props;
    const { message, type } = props.message;

    const dispatch = useDispatch();

    const dismiss = () => {
        dispatch(removeMessage(props.message));
    };

    const displayType = () => {
        switch (type) {
            case "info":
                return "Info";
            case "warning":
                return "Warning";
            case "error":
                return "Error";
            default:
                return "";
        }
    };

    return (
        <Box
            className={classNames(styles.box, className)}
            type={type}
            largeRadius
        >
            <Layout vertical stretch>
                <Layout horizontal center gap={12} className={styles.bar}>
                    <Symbol size={24} symbol={type} />
                    <Text>{displayType()}</Text>
                    <Spacer />
                    <Close onClick={dismiss} />
                </Layout>
                <Text className={styles.text}>{message}</Text>
            </Layout>
        </Box>
    );
}

export default MessageBox;
