export type Node = {
    uuid?: string;
    name: string;
    type: string;
    mime?: string;
    size?: number;
    description?: string;
    bucket_uuid?: string;
    created_at?: string;
    updated_at?: string;
};

export type NodeUpload = Node & {
    percentage?: number;
    status?: "uploading" | "done" | "error";
};
