import React, { useState } from "react";
import axios from "axios";
import { api, route } from "Backend/api";
import Layout from "Components/Layout/Layout";
import { Subtitle } from "Components/Title/Title";
import styles from "Pages/ServerConfig/ServerConfig.module.sass";
import Input from "Components/Input/Input";
import Button from "Components/Button/Button";
import { Text } from "Components/Text/Text";
import Symbol from "Components/Symbol/Symbol";
import { StepProps } from "Pages/ServerConfig/ServerConfig";

function OAuthConfigStep(props: StepProps) {
    const [name, setName] = useState<string>();
    const [color, setColor] = useState<string>();
    const [clientID, setClientID] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>();
    const [authorizeURL, setAuthorizeURL] = useState<string>();
    const [accessTokenURL, setAccessTokenURL] = useState<string>();
    const [redirectURL, setRedirectURL] = useState<string>();

    const save = () => {
        axios({
            method: "POST",
            url: route("/config/oauth"),
            params: {
                name,
                color,
                client_id: clientID,
                client_secret: clientSecret,
                authorize_url: authorizeURL,
                access_token_url: accessTokenURL,
                redirect_url: redirectURL,
            },
        })
            .then(() => props.onDone())
            .catch(api.error);
    };

    const onNameChange = (e) => {
        setName(e.target.value);
    };
    const onColorChange = (e) => {
        setColor(e.target.value);
    };
    const onClientIDChange = (e) => {
        setClientID(e.target.value);
    };
    const onClientSecretChange = (e) => {
        setClientSecret(e.target.value);
    };
    const onAuthorizeURLChange = (e) => {
        setAuthorizeURL(e.target.value);
    };
    const onAccessTokenURLChange = (e) => {
        setAccessTokenURL(e.target.value);
    };
    const onRedirectURLChange = (e) => {
        setRedirectURL(e.target.value);
    };

    return (
        <Layout vertical left gap={32}>
            <Subtitle style={{ marginLeft: 12 }}>Authentication setup</Subtitle>
            <Layout right vertical gap={32}>
                <Layout stretch vertical gap={20} className={styles.fields}>
                    <Input
                        label="Provider"
                        name="name"
                        placeholder="GitHub"
                        type="text"
                        value={name}
                        onChange={onNameChange}
                    />
                    <Input
                        label="Color"
                        name="color"
                        type="color"
                        value={color}
                        onChange={onColorChange}
                    />
                    <Input
                        label="Client ID"
                        name="client_id"
                        type="text"
                        value={clientID}
                        onChange={onClientIDChange}
                    />
                    <Input
                        label="Client Secret"
                        name="client_secret"
                        placeholder="***"
                        type="password"
                        value={clientSecret}
                        onChange={onClientSecretChange}
                    />
                    <Input
                        label="Authorize URL"
                        name="authorize_url"
                        placeholder="https://..."
                        type="url"
                        value={authorizeURL}
                        onChange={onAuthorizeURLChange}
                    />
                    <Input
                        label="Access Token URL"
                        name="access_token_url"
                        placeholder="https://..."
                        type="url"
                        value={accessTokenURL}
                        onChange={onAccessTokenURLChange}
                    />
                    <Input
                        label="Redirect URL"
                        name="redirect_url"
                        placeholder="https://..."
                        type="url"
                        value={redirectURL}
                        onChange={onRedirectURLChange}
                    />
                </Layout>
                <Button onClick={save}>
                    <Text>OK</Text>
                    <Symbol symbol="done" />
                </Button>
            </Layout>
        </Layout>
    );
}

export default OAuthConfigStep;
