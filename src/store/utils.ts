import { RecordingsState, recordings }  from "./recordings";
import { UsersState, users } from "./users";

export async function load() {
    await recordings.loadStorage();
    await users.load();
}

export function isLoading(users: UsersState, recordings: RecordingsState): boolean {
    return users.refreshing || recordings.refreshing;
}
