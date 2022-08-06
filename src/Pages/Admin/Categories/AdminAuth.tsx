import React, { useEffect, useState } from "react";
import TitleBar from "Layouts/TitleBar/TitleBar";
import { AuthMethod } from "Models/AuthMethod";
import axios from "axios";
import { api, route } from "Backend/api";
import { useToken } from "Store/Hooks/useToken";
import List from "Components/List/List";
import AuthMethodItem from "Components/AuthMethodItem/AuthMethodItem";
import Toolbar from "Components/Toolbar/Toolbar";
import ToolbarItem from "Components/ToolbarItem/ToolbarItem";
import Spacer from "Components/Spacer/Spacer";

function AdminAuth() {
    const token = useToken();

    const [methods, setMethods] = useState<AuthMethod[]>();

    useEffect(() => {
        axios({
            url: route("/admin/auth"),
            headers: {
                Authorization: token,
            },
        })
            .then((res) => setMethods(res.data.methods))
            .catch(api.error);
    }, []);

    return (
        <React.Fragment>
            <TitleBar title="Authentication" />
            <Toolbar>
                <ToolbarItem symbol="add" text="New login method" />
            </Toolbar>
            <Spacer height={20} />
            <List>
                {methods?.map((method) => (
                    <AuthMethodItem key={method.name} method={method} />
                ))}
            </List>
        </React.Fragment>
    );
}

export default AdminAuth;
