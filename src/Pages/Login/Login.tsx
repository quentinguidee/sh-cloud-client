import React, { useEffect, useState } from "react";

import Button from "Components/Button/Button";
import Symbol from "Components/Symbol/Symbol";
import Layout from "Components/Layout/Layout";
import { Subtitle, Title } from "Components/Title/Title";

import styles from "./Login.module.sass";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "Store/Slices/AuthSlice";
import Box from "Components/Box/Box";
import axios from "axios";
import { api, route } from "Backend/api";
import { AuthMethod } from "Models/AuthMethod";

type LoginButtonProps = {
    method: AuthMethod;
    onClick: () => void;
};

function LoginButton(props: LoginButtonProps) {
    const { method, onClick } = props;
    const { display_name, color: backgroundColor } = method;

    return (
        <Button big onClick={onClick} style={{ backgroundColor }}>
            {display_name}
            <Symbol symbol="login" />
        </Button>
    );
}

function Login() {
    const [params] = useSearchParams();

    const dispatch = useDispatch();

    const [methods, setMethods] = useState<AuthMethod[]>();

    const [code, setCode] = useState<string | undefined>();
    const [state, setState] = useState<string | undefined>();

    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState<string | undefined>(
        "Loading login methods...",
    );

    const navigate = useNavigate();

    const login = (method: AuthMethod) => {
        setLoading(`Redirecting to ${method.name}...`);
        setError(undefined);

        axios
            .get(route(`/auth/${method.name}/login`))
            .then((res) => {
                window.location = res.data.url;
            })
            .catch((err) => {
                console.error(err);
                setError(
                    err?.response?.data?.message ??
                        err.message ??
                        err.toString(),
                );
                setLoading(undefined);
            });
    };

    const callbackGithub = async () => {
        setLoading("Authenticating...");

        axios
            .post(route("/auth/github/callback"), { code, state })
            .then((res) => {
                dispatch(setUser(res.data.user));
                dispatch(setToken(res.data.token));

                console.log("Logged in successfully");
                navigate("/");
            })
            .catch((err) => {
                console.error(err.response);
                setError(
                    err?.response?.data?.message ??
                        err.message ??
                        err.toString(),
                );
                setLoading(undefined);
            });
    };

    useEffect(() => {
        // TODO: Don't execute this request on /callback.
        axios
            .get(route("/auth"))
            .then((res) => {
                setMethods(res.data.methods);
                setLoading(undefined);
            })
            .catch(api.error);
    }, []);

    useEffect(() => {
        const code = params.get("code");
        const state = params.get("state");
        setCode(code);
        setState(state);
    }, [params]);

    useEffect(() => {
        if (!code || !state) return;
        callbackGithub().then(console.log);
    }, [code, state]);

    return (
        <div className={styles.content}>
            <Layout vertical className={styles.login} gap={24}>
                {!loading && (
                    <Box type="primary">
                        <Layout vertical gap={24}>
                            <Title>Login</Title>
                            {methods?.map((method) => (
                                <LoginButton
                                    key={method.name}
                                    method={method}
                                    onClick={() => login(method)}
                                />
                            ))}
                        </Layout>
                    </Box>
                )}
                {loading && <Box type="primary">{loading}</Box>}
                {error && (
                    <Box type="error">
                        <Layout vertical gap={12}>
                            <Subtitle>Error</Subtitle>
                            {error}
                        </Layout>
                    </Box>
                )}
            </Layout>
        </div>
    );
}

export default Login;
