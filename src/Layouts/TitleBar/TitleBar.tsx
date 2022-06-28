import React from "react";

import styles from "./TitleBar.module.sass";

import Layout from "Components/Layout/Layout";
import { Title } from "Components/Title/Title";
import Spacer from "Components/Spacer/Spacer";
import Account from "Layouts/Account/Account";
import { useUser } from "Store/Hooks/useUser";

type Props = {
    title: string;
};

function TitleBar(props: Props) {
    const { title } = props;

    const user = useUser();

    return (
        <Layout horizontal center className={styles.bar}>
            <Title className={styles.title}>{title}</Title>
            <Spacer />
            <Account user={user} />
        </Layout>
    );
}

export default TitleBar;
