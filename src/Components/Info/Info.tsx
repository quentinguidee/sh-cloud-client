import React from "react";
import Layout from "Components/Layout/Layout";
import { Caption, Text } from "Components/Text/Text";

type Props = React.PropsWithChildren<{
    title: string;
}>;

function Info(props: Props) {
    const { title, children } = props;
    if (children === undefined || children === "") return;

    return (
        <Layout vertical gap={6}>
            <Caption>{title}</Caption>
            <Text>{children}</Text>
        </Layout>
    );
}

export default Info;
