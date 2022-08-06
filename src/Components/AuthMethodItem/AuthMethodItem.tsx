import Layout from "Components/Layout/Layout";
import styles from "./AuthMethodItem.module.sass";
import { Caption, Text } from "Components/Text/Text";
import React from "react";
import { AuthMethod } from "Models/AuthMethod";
import Code from "Components/Code/Code";
import Spacer from "Components/Spacer/Spacer";

type Props = {
    method: AuthMethod;
};

function AuthMethodItem(props: Props) {
    const { method } = props;
    return (
        <Layout vertical top left gap={8} className={styles.item}>
            <Text>{method.displayName}</Text>
            <Spacer />
            <Caption>
                Client ID: <Code>{method.clientID}</Code>
            </Caption>
            <Caption>
                Client Secret: <Code>{method.clientSecret}</Code>
            </Caption>
            <Caption>
                Authorize URL: <Code>{method.authorizeURL}</Code>
            </Caption>
            <Caption>
                Access Token URL: <Code>{method.accessTokenURL}</Code>
            </Caption>
            <Caption>
                Redirect URL: <Code>{method.redirectURL}</Code>
            </Caption>
        </Layout>
    );
}

export default AuthMethodItem;
