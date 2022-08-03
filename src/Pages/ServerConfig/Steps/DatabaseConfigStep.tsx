import React, { Fragment, useState } from "react";
import axios from "axios";
import { api, route } from "Backend/api";
import Layout from "Components/Layout/Layout";
import styles from "Pages/ServerConfig/ServerConfig.module.sass";
import Input from "Components/Input/Input";
import Button from "Components/Button/Button";
import { Text } from "Components/Text/Text";
import Symbol from "Components/Symbol/Symbol";
import { StepProps } from "Pages/ServerConfig/ServerConfig";
import InputSelect, { InputSelectItem } from "Components/Input/InputSelect";
import Box from "Components/Box/Box";

type DBMS = "postgresql" | "sqlite";

function DatabaseConfigStep(props: StepProps) {
    const [dbms, setDBMS] = useState<DBMS>();
    const [host, setHost] = useState<string>();
    const [name, setName] = useState<string>();
    const [user, setUser] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const save = () => {
        if (!canTryToConnect()) return;
        setError(undefined);
        setLoading(true);

        let params;
        switch (dbms) {
            case "sqlite":
                params = { dbms };
                break;
            case "postgresql":
                params = { dbms, host, name, user, password };
                break;
        }

        axios({
            method: "POST",
            url: route("/config/database"),
            params,
        })
            .then(() => props.onDone())
            .catch((err) => {
                const res = err.response;
                if (res.data.type === "DatabaseConnectionFailedException") {
                    setError(`${res.data.message} Try different values.`);
                } else {
                    api.error(err);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onDBMSChange = (e) => setDBMS(e.target.value);
    const onHostChange = (e) => setHost(e.target.value);
    const onNameChange = (e) => setName(e.target.value);
    const onUserChange = (e) => setUser(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const canTryToConnect = () => {
        switch (dbms) {
            case "sqlite":
                return true;
            case "postgresql":
                return (
                    host?.length > 0 &&
                    name?.length > 0 &&
                    user?.length > 0 &&
                    password?.length > 0
                );
            default:
                return false;
        }
    };

    return (
        <Fragment>
            <Layout stretch vertical gap={20} className={styles.fields}>
                <InputSelect label="DBMS" name="dbms" onChange={onDBMSChange}>
                    <InputSelectItem value="postgresql">
                        PostgreSQL
                    </InputSelectItem>
                    <InputSelectItem value="sqlite">SQLite</InputSelectItem>
                </InputSelect>
                {dbms === "postgresql" && (
                    <Fragment>
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
                    </Fragment>
                )}
                {loading && <Text>Loading...</Text>}
                {error && (
                    <Box type="error">
                        <Layout horizontal gap={12}>
                            <Symbol symbol="error" />
                            <Text>{error}</Text>
                        </Layout>
                    </Box>
                )}
            </Layout>
            <Button big disabled={!canTryToConnect() || loading} onClick={save}>
                <Text>Connect</Text>
                <Symbol symbol="router" />
            </Button>
        </Fragment>
    );
}

export default DatabaseConfigStep;
