import React, { Fragment, useEffect, useState } from "react";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";
import TitleBar from "Layouts/TitleBar/TitleBar";
import Layout from "Components/Layout/Layout";
import { Command } from "Models/Command";
import { pushCommand, removeCommand } from "Store/Slices/CommandsSlice";
import { useFilePicker } from "use-file-picker";
import { Node, NodeUpload } from "Models/Node";
import { pushUpload, updateUpload } from "Store/Slices/UploadsSlice";
import axios from "axios";
import { api, route } from "Backend/api";
import { useDispatch } from "react-redux";
import FileListItem from "Layouts/FileListItem/FileListItem";
import { useToken } from "Store/Hooks/useToken";
import { useNavigate, useParams } from "react-router-dom";
import Toolbar from "Components/Toolbar/Toolbar";
import ToolbarItem from "Components/ToolbarItem/ToolbarItem";
import Spacer from "Components/Spacer/Spacer";
import { Bucket } from "Models/Bucket";

type Props = {
    bucket: Bucket;
};

function StorageBucket(props: Props) {
    const { "*": uuid } = useParams();

    const { bucket } = props;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const token = useToken();

    const [nodes, setNodes] = useState<Node[]>([]);
    const [newNode, setNewNode] = useState<Node | undefined>();

    const [openFileSelector, { plainFiles }] = useFilePicker({
        multiple: true,
    });

    useEffect(() => {
        plainFiles.forEach(uploadFile);
    }, [plainFiles]);

    useEffect(() => {
        navigate(bucket.rootNode?.uuid);
    }, [props.bucket]);

    useEffect(() => {
        if (uuid && uuid.length > 0) {
            reload();
            return;
        }
    }, [uuid]);

    const reload = () => {
        axios({
            url: route(`/storage/nodes`),
            params: {
                parent_uuid: uuid,
            },
            headers: {
                Authorization: token,
            },
        })
            .then((res) => {
                console.table(res.data);
                setNodes(res.data);
            })
            .catch(api.error);
    };

    const createFile = (type: string) => {
        setNewNode({ name: "", type, mime: "text/plain" });
    };

    const importFile = () => {
        openFileSelector();
    };

    const uploadFile = (file: File) => {
        const node: NodeUpload = {
            name: file.name,
            type: "file",
            mime: file.type,
            percentage: 0,
        };

        dispatch(pushUpload(node));

        const data = new FormData();
        data.append("file", file);

        axios({
            method: "POST",
            url: route(`/storage/nodes/upload`),
            params: {
                parent_uuid: uuid,
            },
            data: data,
            headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progress) => {
                const percentage = Math.ceil(
                    (progress.loaded / progress.total) * 100,
                );
                dispatch(updateUpload({ node, changes: { percentage } }));
            },
        })
            .then(() => {
                reload();
                dispatch(
                    updateUpload({
                        node,
                        changes: { percentage: 100, status: "done" },
                    }),
                );
            })
            .catch((e) => {
                api.error(e);
                dispatch(
                    updateUpload({
                        node,
                        changes: { percentage: 100, status: "error" },
                    }),
                );
            });
    };

    useEffect(() => {
        const commands: Command[] = [
            {
                id: "create_file",
                icon: "article",
                name: "Create file",
                callback: () => createFile("file"),
                tooltip: "Create a blank file in the current directory.",
            },
            {
                id: "create_folder",
                icon: "create_new_folder",
                name: "Create folder",
                callback: () => createFile("directory"),
                tooltip: "Create a new folder in the current directory.",
            },
            {
                id: "import_files",
                icon: "file_upload",
                name: "Import files",
                callback: () => importFile(),
                tooltip:
                    "Import a new file or folder in the current directory.",
            },
        ];

        commands.forEach((c) => dispatch(pushCommand(c)));
        return () => commands.forEach((c) => dispatch(removeCommand(c)));
    }, []);

    const createFileCallback = (node?: Node) => {
        setNewNode(undefined);

        if (!node) return;

        axios({
            method: "PUT",
            url: route(`/storage/nodes`),
            params: {
                parent_uuid: uuid,
                type: node.type,
                name: node.name,
            },
            headers: {
                Authorization: token,
            },
        })
            .then(() => reload())
            .catch(api.error);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const { files } = e.dataTransfer;
        if (files) {
            Array.from(files).forEach(uploadFile);
        }
    };

    return (
        <Fragment>
            <TitleBar title="My storage" />
            <Layout vertical gap={20}>
                <Toolbar>
                    <ToolbarItem
                        symbol="add"
                        text="New file"
                        onClick={() => createFile("file")}
                    />
                    <ToolbarItem
                        symbol="create_new_folder"
                        text="New folder"
                        onClick={() => createFile("directory")}
                    />
                    <ToolbarItem
                        symbol="file_upload"
                        text="Upload"
                        onClick={() => importFile()}
                    />
                </Toolbar>
                {newNode && (
                    <React.Fragment>
                        <FileListItem
                            editing
                            node={newNode}
                            onDelete={undefined}
                            onValidation={createFileCallback}
                        />
                    </React.Fragment>
                )}
                <Spacer />
            </Layout>
            <FileExplorer
                nodes={nodes}
                onReload={reload}
                onDrop={onDrop}
                ifEmptyMessage="This folder is empty."
            />
        </Fragment>
    );
}

export default StorageBucket;
