import React, { CSSProperties, useState } from "react";

import styles from "./Account.module.sass";
import User from "Models/User";
import Popover from "Components/Popover/Popover";
import Layout from "Components/Layout/Layout";
import PopoverItemWithSymbol from "Components/PopoverItemWithSymbol/PopoverItemWithSymbol";
import ProfilePicture from "Components/ProfilePicture/ProfilePicture";

type Props = {
    user?: User;
};

function Account(props: Props) {
    const { user } = props;

    const [show, setShow] = useState<boolean>(false);

    const popoverStyle: CSSProperties = {
        right: 0,
        top: "48px",
    };

    const togglePopover = () => {
        setShow(!show);
    };

    return (
        <div className={styles.account}>
            <ProfilePicture
                src={user?.profilePicture}
                onClick={togglePopover}
                className={styles.picture}
            />
            <Popover
                show={show}
                className={styles.popover}
                style={popoverStyle}
                onClose={() => setShow(false)}
                animateFrom="top right"
            >
                <Layout vertical gap={4}>
                    <PopoverItemWithSymbol symbol="person" to="/settings/me">
                        {user?.name}
                    </PopoverItemWithSymbol>
                    <PopoverItemWithSymbol symbol="logout" to="/logout" red>
                        Logout
                    </PopoverItemWithSymbol>
                </Layout>
            </Popover>
        </div>
    );
}

export default Account;
