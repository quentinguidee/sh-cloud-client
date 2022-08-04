import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "Store/Hooks/useToken";
import axios from "axios";
import { route } from "Backend/api";
import Box from "Components/Box/Box";
import styles from "./Logout.module.sass";
import Layout from "Components/Layout/Layout";
import { Subtitle } from "Components/Title/Title";

function Logout() {
    const navigate = useNavigate();

    const token = useToken();

    const logout = async () => {
        axios({
            method: "POST",
            url: route("/auth/logout"),
            headers: {
                Authorization: token,
            },
        })
            .then(() => navigate("/login"))
            .catch(console.error);
    };

    useEffect(() => {
        logout().then(undefined);
    }, []);

    return (
        <div className={styles.content}>
            <Layout vertical className={styles.logout}>
                <Box type="primary">
                    <Subtitle>Disconnecting...</Subtitle>
                </Box>
            </Layout>
        </div>
    );
}

export default Logout;
