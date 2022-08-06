import React, { useEffect, useState } from "react";
import TitleBar from "Layouts/TitleBar/TitleBar";
import axios from "axios";
import { useToken } from "Store/Hooks/useToken";
import { api, route } from "Backend/api";
import InlineInfo from "Components/InlineInfo/InlineInfo";
import Code from "Components/Code/Code";
import Layout from "Components/Layout/Layout";
import { Text } from "Components/Text/Text";

type Database = {
    dbms?: string;
    host?: string;
    name?: string;
    user?: string;
    password?: string;
};

function AdminDatabase() {
    const token = useToken();

    const [database, setDatabase] = useState<Database>({});

    const load = () => {
        axios({
            url: route("/admin/database"),
            headers: {
                Authorization: token,
            },
        })
            .then((res) => setDatabase(res.data))
            .catch(api.error);
    };

    useEffect(() => load(), []);

    let component;
    if (database?.dbms === undefined) {
        component = <Text>Loading...</Text>;
    } else {
        component = [];
        for (const key in database) {
            const value = database[key];
            component.push(
                <InlineInfo key={key} title={key}>
                    <Code>{value}</Code>
                </InlineInfo>,
            );
        }
    }

    return (
        <React.Fragment>
            <TitleBar title="Database" />
            <Layout vertical left gap={8}>
                {component}
            </Layout>
        </React.Fragment>
    );
}

export default AdminDatabase;
