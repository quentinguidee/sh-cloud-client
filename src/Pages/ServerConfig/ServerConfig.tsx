import React, { useEffect, useState } from "react";
import styles from "./ServerConfig.module.sass";
import { Text } from "Components/Text/Text";
import axios from "axios";
import { api, route } from "Backend/api";
import { useNavigate } from "react-router-dom";
import DatabaseConfigStep from "Pages/ServerConfig/Steps/DatabaseConfigStep";
import OAuthConfigStep from "Pages/ServerConfig/Steps/OAuthConfigStep";
import Layout from "Components/Layout/Layout";
import Box from "Components/Box/Box";

export type StepProps = {
    onDone: () => void;
};

type Step = "database" | "oauth";

function ServerConfig() {
    const [loading, setLoading] = useState<boolean>(true);
    const [step, setStep] = useState<Step>("database");

    const navigate = useNavigate();

    const next = (): Step => {
        if (step === "database") {
            setStep("oauth");
            return;
        }
        navigate("/login");
    };

    const load = () => {
        axios({
            method: "GET",
            url: route(`/config/${step}`),
        })
            .then((res) => {
                if (res.data.already_done) {
                    next();
                } else {
                    setLoading(false);
                }
            })
            .catch(api.error);
    };

    useEffect(() => load(), [step]);

    let content;
    switch (step) {
        case "database":
            content = <DatabaseConfigStep onDone={next} />;
            break;
        case "oauth":
            content = <OAuthConfigStep onDone={next} />;
            break;
    }

    return (
        <Layout horizontal className={styles.content}>
            <Box type="primary">
                <Layout vertical stretch gap={32}>
                    {loading ? <Text>Loading...</Text> : content}
                </Layout>
            </Box>
        </Layout>
    );
}

export default ServerConfig;
