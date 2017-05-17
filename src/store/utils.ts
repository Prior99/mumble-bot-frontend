import { RecordingsState, recordings }  from "./recordings";
import { UsersState, users } from "./users";
import { cached } from "./cached";
import { labels } from "./labels";

export async function load() {
    await recordings.loadStorage();
    await users.load();
    await cached.init();
    await labels.load();
}

export function isLoading(users: UsersState, recordings: RecordingsState): boolean {
    return users.loading || recordings.loading || labels.loading;
}

