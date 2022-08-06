import React, { Fragment, useState } from "react";
import styles from "./SettingsProfile.module.sass";
import { Text } from "Components/Text/Text";
import TitleBar from "Layouts/TitleBar/TitleBar";
import Layout from "Components/Layout/Layout";
import ProfilePicture from "Components/ProfilePicture/ProfilePicture";
import { useUser } from "Store/Hooks/useUser";
import AccountRole from "Components/AccountRole/AccountRole";
import { InputField } from "Components/Input/Input";
import Button from "Components/Button/Button";
import Symbol from "Components/Symbol/Symbol";
import axios from "axios";
import { api, route } from "Backend/api";
import { useToken } from "Store/Hooks/useToken";
import { useDispatch } from "react-redux";
import { setUser } from "Store/Slices/AuthSlice";

function SettingsProfile() {
    const user = useUser();
    const token = useToken();
    const dispatch = useDispatch();

    const [name, setName] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);

    const [updating, setUpdating] = useState<boolean>(false);

    const update = () => {
        setUpdating(true);
        axios({
            method: "PATCH",
            url: route("/user"),
            params: {
                name,
                email,
                profile_picture: user.profilePicture,
            },
            headers: {
                Authorization: token,
            },
        })
            .then((res) => {
                dispatch(setUser(res.data));
            })
            .catch(api.error)
            .finally(() => setUpdating(false));
    };

    const onNameChange = (e) => setName(e.target.value);
    const onEmailChange = (e) => setEmail(e.target.value);

    return (
        <Fragment>
            <TitleBar title="My profile" />
            <Layout vertical left gap={24}>
                <Layout horizontal center gap={12}>
                    <ProfilePicture size={40} src={user.profilePicture} />
                    <Layout vertical left gap={8}>
                        <Text>{user.username}</Text>
                        <AccountRole role={user.role} />
                    </Layout>
                </Layout>
                <InputField
                    label="Name"
                    name="name"
                    value={name}
                    placeholder="Jean Dupont"
                    onChange={onNameChange}
                    disabled={updating}
                    className={styles.input}
                />
                <InputField
                    label="Email"
                    name="email"
                    value={email}
                    placeholder="jean.dupont@example.com"
                    onChange={onEmailChange}
                    disabled={updating}
                    className={styles.input}
                />
                <Layout horizontal center gap={12}>
                    <Button onClick={update} disabled={updating}>
                        <Text>Update profile</Text>
                        <Symbol symbol="done" />
                    </Button>
                    {updating && <Text>Updating...</Text>}
                </Layout>
            </Layout>
        </Fragment>
    );
}

export default SettingsProfile;
