import { Parent } from "./Parent";

export interface Child {
    id: string;
    name: string;
    difficulty: string;
    parentId: string;
    parent: Parent;
}