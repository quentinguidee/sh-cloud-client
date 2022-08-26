import React, { useEffect, useState } from "react";
import styles from "./NodePreview.module.sass";
import { Node } from "Models/Node";
import axios from "axios";
import { api, route } from "Backend/api";
import { useToken } from "Store/Hooks/useToken";
import classNames from "classnames";
import Layout from "Components/Layout/Layout";
import ProgressBar from "Components/ProgressBar/ProgressBar";
import CodeBlock from "Components/CodeBlock/CodeBlock";

type Props = {
    node?: Node;
    className?: string;
    maximize?: boolean;
};

function NodePreview(props: Props) {
    const { node, className, maximize } = props;

    if (!node) return null;

    const token = useToken();

    const [data, setData] = useState<Blob>(undefined);
    const [content, setContent] = useState(undefined);
    const [loadingPercentage, setLoadingPercentage] =
        useState<number>(undefined);

    const downloadNode = (node: Node) => {
        if (node.type === "directory") return;
        setLoadingPercentage(0);
        axios({
            method: "GET",
            url: route(`/storage/nodes/download`),
            params: {
                node_uuid: node.uuid,
            },
            headers: {
                Authorization: token,
            },
            responseType: "blob",
            onDownloadProgress: (progress) => {
                const percentage = Math.ceil(
                    (progress.loaded / progress.total) * 100,
                );
                setLoadingPercentage(percentage);
            },
        })
            .then((res) => {
                setData(res.data);
                setLoadingPercentage(undefined);
            })
            .catch(api.error);
    };

    useEffect(() => {
        downloadNode(node);
    }, [node]);

    useEffect(() => {
        if (!data) return;

        const contentProps = {
            className: classNames(styles.content, className),
            src: URL.createObjectURL(data),
        };

        if (node?.mime?.includes("image/")) {
            setContent(<img alt={node?.name} {...contentProps} />);
            return;
        }

        if (node?.mime?.includes("video/")) {
            setContent(
                <video {...contentProps} datatype={node?.mime} controls />,
            );
            return;
        }

        if (node?.mime?.includes("audio/")) {
            setContent(<audio {...contentProps} controls />);
            return;
        }

        if (node?.mime?.includes("application/pdf")) {
            setContent(
                <object
                    data={contentProps.src}
                    className={classNames(contentProps.className, styles.pdf)}
                />,
            );
            return;
        }

        // Only for languages where the Syntax-Highlighter name is different
        // from the cloud.sh filetype.
        //
        // File type => Syntax Highlighter Language
        const languages = {
            file: "text",
        };

        data.text().then((text) => {
            const maxContentSize = 10000;
            if (text === "") return null;
            if (text.length > maxContentSize) {
                text = text.slice(0, maxContentSize);
                // TODO: Show this warning in the UI.
                text +=
                    "\n\nNOTE: The end of this file cannot be rendered in preview mode.";
            }
            setContent(
                <CodeBlock
                    language={languages[node?.type] || node?.type}
                    {...contentProps}
                >
                    {text}
                </CodeBlock>,
            );
        });
    }, [data]);

    if (loadingPercentage !== undefined && !data) {
        return <ProgressBar percentage={loadingPercentage} />;
    }

    if (data) {
        return (
            <Layout middle maximize={maximize} className={styles.wrapper}>
                {content}
            </Layout>
        );
    }

    return null;
}

export default NodePreview;
