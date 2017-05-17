import { RecordingsState, recordings }  from "./recordings";
import { UsersState, users } from "./users";
import { cached } from "./cached";

export async function load() {
    await recordings.loadStorage();
    await users.load();
    await cached.init();
}

export function isLoading(users: UsersState, recordings: RecordingsState): boolean {
    return users.loading || recordings.loading;
}

