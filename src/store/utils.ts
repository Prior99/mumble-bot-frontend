import { RecordingsState, recordings }  from "./recordings";
import { UsersState, users } from "./users";
import { cached } from "./cached";
import { labels } from "./labels";
import { queue } from "./queue";
import { sounds } from "./";

const LOAD_TIMEOUT = 2000;

export async function load() {
    await recordings.refresh();
    await users.load();
    await cached.init();
    await labels.load();
    await queue.init();
    await sounds.load();
}

function isTimeouted(date: Date) {
    return typeof date === "object" && Date.now() - date.getTime() > LOAD_TIMEOUT;
}

function isBusy(date: Date) {
    return typeof date === "object";
}

export function isLoadingTimeouted(): boolean {
    return isTimeouted(users.loading) ||
        isTimeouted(recordings.loading) ||
        isTimeouted(cached.loading) ||
        isTimeouted(labels.loading) ||
        isTimeouted(sounds.loading);
}

export function isLoading(): boolean {
    return isBusy(users.loading) ||
        isBusy(recordings.loading) ||
        isBusy(cached.loading) ||
        isBusy(labels.loading) ||
        isBusy(sounds.loading);
}

export function isDisconnected(): boolean {
    return cached.disconnected || queue.disconnected;
}
