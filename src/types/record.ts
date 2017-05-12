import { User } from "./user";
import { Label } from "./label";

export interface Record {
    id: number;
    quote: string;
    used: number;
    user: User;
    submitted: Date;
    duration: number;
    changed: Date;
    reporter: User;
    overwrite: number;
    parent: number;
    labels: Label[];
}
