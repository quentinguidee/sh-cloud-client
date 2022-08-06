import React from "react";
import Page from "Layouts/Page/Page";
import TitleBar from "Layouts/TitleBar/TitleBar";
import { useApps } from "Store/Hooks/useApps";
import Layout from "Components/Layout/Layout";
import WelcomeCard from "Pages/Welcome/WelcomeCard";
import { Subtitle } from "Components/Title/Title";
import { App } from "Models/App";
import ProfilePicture from "Components/ProfilePicture/ProfilePicture";
import { useUser } from "Store/Hooks/useUser";
import { Text } from "Components/Text/Text";

type Props = {
    title: string;
    condition: (app: App) => boolean;
};

function Section(props: Props) {
    const apps = useApps();

    const { title, condition } = props;

    return (
        <Layout vertical left gap={16}>
            <Subtitle>{title}</Subtitle>
            <Layout horizontal gap={16}>
                {apps?.filter(condition).map((app) => (
                    <WelcomeCard app={app} />
                ))}
            </Layout>
        </Layout>
    );
}

function Welcome() {
    const user = useUser();

    return (
        <Page>
            <TitleBar title="Your cloud." />
            <Layout vertical left gap={24}>
                <Layout horizontal center gap={12}>
                    <ProfilePicture src={user?.profilePicture} />
                    <Text>Welcome back {user?.name}</Text>
                </Layout>
                <Section
                    title="Apps"
                    condition={(app) =>
                        app.position === undefined || app.position === "normal"
                    }
                />
                <Section
                    title="Settings"
                    condition={(app) => app.position === "settings"}
                />
            </Layout>
        </Page>
    );
}

export default Welcome;
