import React, { useEffect, useState } from "react";

import styles from "./StorageNavBar.module.sass";

import NavBar from "Components/NavBar/NavBar";
import NavBarItem from "Components/NavBarItem/NavBarItem";
import Layout from "Components/Layout/Layout";
import ProgressBar from "Components/ProgressBar/ProgressBar";
import { Caption } from "Components/Text/Text";
import prettyBytes from "pretty-bytes";
import { Bucket } from "Models/Bucket";

type Props = {
    bucket: Bucket;
};

function StorageSize(props: Props) {
    const [bucketSize, setBucketSize] = useState<number>();
    const [bucketLimit, setBucketLimit] = useState<number>();

    useEffect(() => {
        if (props.bucket) {
            setBucketSize(props.bucket.size);
            setBucketLimit(props.bucket.maxSize);
        }
    }, [props.bucket]);

    if (!bucketSize) return;

    if (!bucketLimit) {
        return (
            <Layout vertical gap={6} className={styles.storageProgress}>
                <Caption>Stored: {prettyBytes(bucketSize)}</Caption>
            </Layout>
        );
    }

    return (
        <Layout vertical gap={6} className={styles.storageProgress}>
            <Caption>
                {prettyBytes(bucketSize)}/{prettyBytes(bucketLimit)}
            </Caption>
            <ProgressBar percentage={(bucketSize / bucketLimit) * 100} />
        </Layout>
    );
}

function StorageNavBar(props: Props) {
    return (
        <NavBar title="Storage">
            <Layout vertical stretch gap={4}>
                <NavBarItem
                    to={`/storage/bucket/${props.bucket.rootNode.uuid}`}
                    icon="storage"
                >
                    My storage
                </NavBarItem>
                <NavBarItem to="/storage/recent" icon="schedule">
                    Recent
                </NavBarItem>
                <NavBarItem to="/storage/bin" icon="delete">
                    Bin
                </NavBarItem>
                <StorageSize {...props} />
            </Layout>
        </NavBar>
    );
}

export default StorageNavBar;
