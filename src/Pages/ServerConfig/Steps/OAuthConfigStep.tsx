import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { api, route } from "Backend/api";
import Layout from "Components/Layout/Layout";
import styles from "Pages/ServerConfig/ServerConfig.module.sass";
import Input from "Components/Input/Input";
import Button from "Components/Button/Button";
import { Text } from "Components/Text/Text";
import Symbol from "Components/Symbol/Symbol";
import { StepProps } from "Pages/ServerConfig/ServerConfig";
import { Title } from "Components/Title/Title";
import InputSelect, { InputSelectItem } from "Components/Input/InputSelect";

type Preset = {
    name: string;
    color: string;
    authorizeURL: string;
    accessTokenURL: string;
};

const presets: { [key: string]: Preset } = {
    github: {
        name: "GitHub",
        color: "#111111",
        authorizeURL: "https://github.com/login/oauth/authorize",
        accessTokenURL: "https://github.com/login/oauth/access_token",
    },
};

function OAuthConfigStep(props: StepProps) {
    const [presetKey, setPresetKey] = useState<string>();
    const [name, setName] = useState<string>();
    const [color, setColor] = useState<string>();
    const [clientID, setClientID] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>();
    const [authorizeURL, setAuthorizeURL] = useState<string>();
    const [accessTokenURL, setAccessTokenURL] = useState<string>();
    const [redirectURL, setRedirectURL] = useState<string>(
        `${window.location.protocol}//${window.location.host}/login`,
    );

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

    const onPresetChange = (e) => {
        setPresetKey(e.target.value);
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

    useEffect(() => {
        if (presetKey === undefined || !(presetKey in presets)) {
            if (presetKey !== "other") setPresetKey(undefined);
            setName("");
            setColor("");
            setAuthorizeURL("");
            setAccessTokenURL("");
            return;
        }
        const preset = presets[presetKey];
        setName(preset.name);
        setColor(preset.color);
        setAuthorizeURL(preset.authorizeURL);
        setAccessTokenURL(preset.accessTokenURL);
    }, [presetKey]);

    let presetOptions = [];
    for (const key in presets) {
        const preset = presets[key];
        presetOptions.push(
            <InputSelectItem value={key}>{preset.name}</InputSelectItem>,
        );
    }

    const isPresetUndef = presetKey === undefined;
    const isPresetOther = presetKey === "other";

    return (
        <Fragment>
            <Title>Authentication setup</Title>
            <Layout stretch vertical gap={20} className={styles.fields}>
                <InputSelect label="Provider" onChange={onPresetChange}>
                    {presetOptions}
                    <InputSelectItem value="other">Other...</InputSelectItem>
                </InputSelect>
                {isPresetOther && (
                    <Fragment>
                        <Input
                            label="Provider name"
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
                    </Fragment>
                )}
                {!isPresetUndef && (
                    <Fragment>
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
                    </Fragment>
                )}
                {isPresetOther && (
                    <Fragment>
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
                    </Fragment>
                )}
                {!isPresetUndef && (
                    <Input
                        label="Redirect URL"
                        name="redirect_url"
                        placeholder="https://..."
                        type="url"
                        value={redirectURL}
                        disabled={true}
                        onChange={onRedirectURLChange}
                    />
                )}
            </Layout>
            <Button big onClick={save}>
                <Text>OK</Text>
                <Symbol symbol="done" />
            </Button>
        </Fragment>
    );
}

export default OAuthConfigStep;
