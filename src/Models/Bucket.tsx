import { Node } from "Models/Node";
import User from "Models/User";

export type Bucket = {
    uuid: string;
    name: string;
    type: string;
    size: number;
    rootNode: Node;
    maxSize?: number;
    users?: User[];
};
