import { User } from "./users";
import { Label } from "./labels";

export interface Recording {
    id: number;
    quote: string;
    used: number;
    user: number;
    submitted: Date;
    duration: number;
    changed: Date;
    reporter: number;
    overwrite: number;
    parent: number;
    labels: Label[];
}
