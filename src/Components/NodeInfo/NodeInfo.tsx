import React, { Fragment, useEffect, useState } from "react";
import Layout from "Components/Layout/Layout";
import { Subtitle } from "Components/Title/Title";

import styles from "./NodeInfo.module.sass";
import { Node } from "Models/Node";
import NodeSymbol from "Components/NodeSymbol/NodeSymbol";
import Spacer from "Components/Spacer/Spacer";
import Close from "Components/Close/Close";
import { Caption, Text } from "Components/Text/Text";
import prettyBytes from "pretty-bytes";
import classNames from "classnames";
import Overlay from "Components/Overlay/Overlay";
import NodePreview from "Components/NodePreview/NodePreview";
import Info from "Components/Info/Info";
import { InputArea } from "Components/Input/Input";
import Separator from "Components/Separator/Separator";
import Button from "Components/Button/Button";
import Symbol from "Components/Symbol/Symbol";
import axios from "axios";
import { api, route } from "Backend/api";
import { useToken } from "Store/Hooks/useToken";

type Props = {
    node?: Node;
    onClose?: () => void;
};

function NodeInfo(props: Props) {
    const token = useToken();

    let fields = [];

    const [node, setNode] = useState<Node>(props.node);
    const [editing, setEditing] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);

    const size = node?.size ? prettyBytes(node?.size) : undefined;

    useEffect(() => setNode(props.node), [props.node]);

    const save = () => {
        setSaving(true);
        axios({
            method: "PATCH",
            url: route("/storage/nodes"),
            params: { ...node },
            headers: {
                Authorization: token,
            },
        })
            .catch(api.error)
            .finally(() => {
                setEditing(false);
                setSaving(false);
            });
    };

    const onDescriptionChange = (e) =>
        setNode({ ...node, description: e.target.value });

    const onClose = () => {
        if (props.onClose) props.onClose();
        setEditing(false);
    };

    if (node?.createdAt) {
        fields.push(
            <Info title="Created at">
                {new Date(node?.createdAt).toLocaleString()}
            </Info>,
        );
    }

    if (node?.updatedAt) {
        fields.push(
            <Info title="Last update">
                {new Date(node?.updatedAt).toLocaleString()}
            </Info>,
        );
    }

    if (node?.mime) {
        fields.push(<Info title="MIME">{node?.mime}</Info>);
    }

    return (
        <React.Fragment>
            <Overlay show={node !== undefined} onClick={onClose} />
            <Layout
                vertical
                className={classNames({
                    [styles.info]: true,
                    [styles.infoShown]: node,
                })}
            >
                <NodePreview className={styles.preview} node={node} />
                <Layout horizontal center gap={12} className={styles.titleBar}>
                    <NodeSymbol node={node} />
                    <Layout vertical gap={2}>
                        <Subtitle className={styles.title}>
                            {node?.name}
                        </Subtitle>
                        {size && <Caption>{size}</Caption>}
                    </Layout>
                    <Spacer />
                    <Close onClick={onClose} />
                </Layout>
                <Layout vertical gap={16} className={styles.content}>
                    {editing ? (
                        <Fragment>
                            <InputArea
                                fixedWidth
                                disabled={saving}
                                value={node?.description}
                                name="Description"
                                label="Description"
                                onChange={onDescriptionChange}
                            />
                            <Layout horizontal center bottom gap={16}>
                                {saving && <Text>Saving...</Text>}
                                <Button onClick={save}>
                                    <Text>Save</Text>
                                    <Symbol symbol="save" />
                                </Button>
                            </Layout>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Info title="Description">
                                {node?.description || "-"}
                            </Info>
                            <Layout horizontal center bottom gap={16}>
                                <Button onClick={() => setEditing(true)}>
                                    <Text>Edit</Text>
                                    <Symbol symbol="edit" />
                                </Button>
                            </Layout>
                        </Fragment>
                    )}
                    <Separator />
                    {fields}
                </Layout>
            </Layout>
        </React.Fragment>
    );
}

export default NodeInfo;
