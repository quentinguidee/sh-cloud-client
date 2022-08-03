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

function DatabaseConfigStep(props: StepProps) {
    const [host, setHost] = useState<string>();
    const [name, setName] = useState<string>();
    const [user, setUser] = useState<string>();
    const [password, setPassword] = useState<string>();

    const save = () => {
        axios({
            method: "POST",
            url: route("/config/database"),
            params: { host, name, user, password },
        })
            .then(() => props.onDone())
            .catch(api.error);
    };

    const onHostChange = (e) => setHost(e.target.value);
    const onNameChange = (e) => setName(e.target.value);
    const onUserChange = (e) => setUser(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    return (
        <Layout vertical left gap={32}>
            <Subtitle style={{ marginLeft: 12 }}>Database setup</Subtitle>
            <Layout right vertical gap={32}>
                <Layout stretch vertical gap={20} className={styles.fields}>
                    <Input
                        label="URL"
                        name="url"
                        placeholder="localhost"
                        type="url"
                        value={host}
                        onChange={onHostChange}
                    />
                    <Input
                        label="Name"
                        name="name"
                        placeholder="cloudsh"
                        type="text"
                        value={name}
                        onChange={onNameChange}
                    />
                    <Input
                        label="Username"
                        name="username"
                        placeholder="jean.dupont"
                        type="text"
                        value={user}
                        onChange={onUserChange}
                    />
                    <Input
                        label="Password"
                        name="password"
                        placeholder="***"
                        type="password"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </Layout>
                <Button onClick={save}>
                    <Text>Connect</Text>
                    <Symbol symbol="network_check" />
                </Button>
            </Layout>
        </Layout>
    );
}

export default DatabaseConfigStep;
