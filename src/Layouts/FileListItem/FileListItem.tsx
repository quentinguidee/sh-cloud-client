import classNames from "classnames";
import Symbol from "Components/Symbol/Symbol";
import { Caption, Text } from "Components/Text/Text";
import { Node } from "Models/Node";
import React, { CSSProperties, useEffect, useRef, useState } from "react";

import styles from "./FileListItem.module.sass";
import Popover from "Components/Popover/Popover";
import PopoverItemWithSymbol from "Components/PopoverItemWithSymbol/PopoverItemWithSymbol";
import { InputField } from "Components/Input/Input";
import Spacer from "Components/Spacer/Spacer";
import Button from "Components/Button/Button";
import PopoverSeparator from "Components/PopoverSeparator/PopoverSeparator";
import NodeSymbol from "Components/NodeSymbol/NodeSymbol";
import Layout from "Components/Layout/Layout";
import prettyBytes from "pretty-bytes";

type Props = React.HTMLProps<HTMLDivElement> & {
    node: Node;
    editing?: boolean;
    onPreview?: () => void;
    onDelete?: () => void;
    onDownload?: () => void;
    onRename?: () => void;
    onShowInfo?: () => void;
    onValidation?: (node?: Node) => void;
};

function FileListItem(props: Props) {
    const {
        className,
        children,
        node,
        onPreview,
        onRename,
        onShowInfo,
        onDelete,
        onDownload,
        onValidation,
        onClick,
        editing: _,
        ...others
    } = props;

    const input = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState<string>(node.name);
    const [editing, setEditing] = useState<boolean>();

    const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
    const [contextMenuX, setContextMenuX] = useState<number | undefined>();
    const [contextMenuY, setContextMenuY] = useState<number | undefined>();

    const openContextMenu = (e) => {
        if (editing) return;
        setShowContextMenu(true);
        setContextMenuX(e.pageX);
        setContextMenuY(e.pageY);
        e.preventDefault();
    };

    const closeContextMenu = () => {
        setShowContextMenu(false);
        setContextMenuX(undefined);
        setContextMenuY(undefined);
    };

    const popoverStyle: CSSProperties = {
        left: contextMenuX + "px",
        top: contextMenuY + "px",
        position: "fixed",
    };

    let contextMenu;
    if (showContextMenu) {
        const onPreview = () => {
            if (props.onPreview) props.onPreview();
            closeContextMenu();
        };

        const onRename = () => {
            if (props.onRename) props.onRename();
            closeContextMenu();
        };

        const onDownload = () => {
            if (props.onDownload) props.onDownload();
            closeContextMenu();
        };

        const onShowInfo = () => {
            if (props.onShowInfo) props.onShowInfo();
            closeContextMenu();
        };

        const onDelete = () => {
            if (props.onDelete) props.onDelete();
            closeContextMenu();
        };

        contextMenu = (
            <Popover
                show={showContextMenu}
                onClose={closeContextMenu}
                style={popoverStyle}
                animateFrom="top left"
            >
                <PopoverItemWithSymbol symbol="preview" onClick={onPreview}>
                    Preview
                </PopoverItemWithSymbol>
                <PopoverSeparator />
                <PopoverItemWithSymbol symbol="edit" onClick={onRename}>
                    Rename
                </PopoverItemWithSymbol>
                <PopoverItemWithSymbol symbol="download" onClick={onDownload}>
                    Download
                </PopoverItemWithSymbol>
                <PopoverSeparator />
                <PopoverItemWithSymbol symbol="info" onClick={onShowInfo}>
                    Info
                </PopoverItemWithSymbol>
                <PopoverItemWithSymbol symbol="delete" onClick={onDelete} red>
                    Delete
                </PopoverItemWithSymbol>
            </Popover>
        );
    }

    useEffect(() => {
        if (props.editing) {
            setTimeout(() => {
                input.current?.focus();
            }, 80);
        }
    }, [props.editing, node]);

    useEffect(() => {
        setEditing(props.editing);
    }, [props.editing]);

    const cancel = () => {
        setInputValue(node.name);
        if (onValidation) onValidation();
    };

    const submit = () => {
        if (onValidation) {
            onValidation({
                ...node,
                name: inputValue,
                type: node.type,
                mime: node.mime,
            });
        }
    };

    const onInputValueChange = (e) => {
        setInputValue(e.target.value);
    };

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValid()) {
            submit();
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Escape") {
            cancel();
        }
    };

    useEffect(() => {
        if (editing) {
            props.editing
                ? document.addEventListener("keydown", onKeyDown)
                : document.removeEventListener("keydown", onKeyDown);
        }

        return () => document.removeEventListener("keydown", onKeyDown);
    }, [editing]);

    const inputValid = () => {
        return inputValue.trim() !== "";
    };

    const onItemClick = (e) => {
        if (editing) {
            input.current.focus();
            return;
        }
        if (onClick) onClick(e);
    };

    let content;
    if (editing) {
        content = (
            <React.Fragment>
                <Spacer width={6} />
                <InputField
                    ref={input}
                    name="name"
                    placeholder="Name"
                    value={inputValue}
                    onChange={onInputValueChange}
                    onKeyDown={onInputKeyDown}
                    small
                />
                <Spacer width={8} />
                <Spacer />
                <Button onlySymbol onClick={cancel}>
                    <Symbol symbol="close" />
                </Button>
                <Button onlySymbol onClick={submit}>
                    <Symbol symbol="check" />
                </Button>
            </React.Fragment>
        );
    } else {
        content = (
            <React.Fragment>
                <Spacer width={14} />
                <Text>{node.name}</Text>
                <Spacer />
                {node?.size !== null && node?.size !== undefined && (
                    <Caption>{prettyBytes(node?.size)}</Caption>
                )}
            </React.Fragment>
        );
    }

    return (
        <div>
            {contextMenu}
            <div
                onContextMenu={openContextMenu}
                onClick={onItemClick}
                {...others}
                className={classNames({
                    [styles.item]: true,
                    [styles.itemSelected]: showContextMenu,
                    [styles.itemEditing]: editing,
                    [className]: true,
                })}
            >
                <Layout horizontal center>
                    <NodeSymbol node={node} />
                    {content}
                </Layout>
            </div>
        </div>
    );
}

export default FileListItem;
