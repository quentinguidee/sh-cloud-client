import React, { useEffect } from "react";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Symbol/Symbol";

import styles from "./Apps.module.sass";
import Logo from "Layouts/Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Command } from "Models/Command";
import { pushCommand, removeCommand } from "Store/Slices/CommandsSlice";
import { useDispatch } from "react-redux";
import { Text } from "Components/Text/Text";
import Spacer from "Components/Spacer/Spacer";
import { useApps } from "Store/Hooks/useApps";
import { App as AppModel } from "Models/App";

type AppProps = {
    app: AppModel;
};

function App(props: AppProps) {
    const { name, symbol, id } = props.app;

    return (
        <NavLink
            to={id}
            className={({ isActive }) =>
                classNames({
                    [styles.app]: true,
                    [styles.appSelected]: isActive,
                })
            }
        >
            <Layout vertical center middle maximize gap={6}>
                <Symbol symbol={symbol} />
                <Layout className={styles.appTooltip}>
                    <Text>{name}</Text>
                </Layout>
            </Layout>
        </NavLink>
    );
}

function Apps() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const apps = useApps();

    useEffect(() => {
        const commands: Command[] = apps?.map((app: AppModel): Command => {
            return {
                id: app.id,
                icon: app.symbol,
                name: `Jump to ${app.name}`,
                callback: () => navigate(`/${app.id}`),
                tooltip: `Open ${app.name}`,
            };
        });

        commands?.forEach((c) => dispatch(pushCommand(c)));
        return () => commands?.forEach((c) => dispatch(removeCommand(c)));
    }, [apps]);

    const normalApps = apps
        ?.filter(
            (app) => app.position === undefined || app.position === "normal",
        )
        .map((app) => <App key={app.id} app={app} />);

    const bottomApps = apps
        ?.filter((app) => app.position === "settings")
        .map((app) => <App key={app.id} app={app} />);

    return (
        <Layout vertical center gap={3} className={styles.apps}>
            <Logo onClick={() => navigate("/")} small className={styles.logo} />
            {normalApps}
            <Spacer />
            {bottomApps}
        </Layout>
    );
}

export default Apps;
