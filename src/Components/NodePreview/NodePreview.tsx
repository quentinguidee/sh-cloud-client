import React, { useEffect, useState } from "react";
import styles from "./NodePreview.module.sass";
import { Node } from "Models/Node";
import axios from "axios";
import { api, route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import classNames from "classnames";
import Layout from "Components/Layout/Layout";

type Props = {
    node?: Node;
    className?: string;
};

function NodePreview(props: Props) {
    const { node, className } = props;

    if (!node) return null;

    const session = useSession();

    const [src, setSrc] = useState<string>(undefined);

    const downloadNode = (node: Node) => {
        axios({
            method: "GET",
            url: route("/storage/download"),
            params: {
                node_uuid: node.uuid,
            },
            headers: {
                Authorization: session.token,
            },
            responseType: "blob",
        })
            .then((res) => {
                setSrc(URL.createObjectURL(res.data));
            })
            .catch(api.error);
    };

    useEffect(() => {
        if (
            node?.mime?.includes("image/") ||
            node?.mime?.includes("video/") ||
            node?.mime?.includes("audio/")
        ) {
            downloadNode(node);
        }
    }, [node]);

    const contentProps = {
        className: classNames(styles.content, className),
        src,
    };

    let content;
    if (node?.mime?.includes("image/")) {
        content = <img alt={node?.name} {...contentProps} />;
    } else if (node?.mime?.includes("video/")) {
        content = <video {...contentProps} datatype={node?.mime} controls />;
    } else if (node?.mime?.includes("audio/")) {
        content = <audio {...contentProps} controls />;
    }

    if (src) {
        return (
            <Layout middle className={styles.wrapper}>
                {content}
            </Layout>
        );
    }

    return null;
}

export default NodePreview;
