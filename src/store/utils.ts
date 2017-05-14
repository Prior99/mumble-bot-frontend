import { recordings }  from "./recordings";
import { users } from "./users";

export async function load() {
    await recordings.loadStorage();
    await users.load();
}

export function isLoading(): boolean {
    return users.refreshing || recordings.refreshing;
}
