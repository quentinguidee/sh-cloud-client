export type Node = {
    uuid?: string;
    name: string;
    type: string;
    mime?: string;
    size?: number;
    description?: string;
    bucketUUID?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type NodeUpload = Node & {
    percentage?: number;
    status?: "uploading" | "done" | "error";
};
