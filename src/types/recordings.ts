import { User } from "./users";
import { Label } from "./labels";

export interface Recording {
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
