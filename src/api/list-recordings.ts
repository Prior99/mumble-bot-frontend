import { callApi } from "./utils";
import { Recording } from "../types";

export async function listRecordings(since?: Date): Promise<Recording[]> {
    if (since) {
        const time = since.getTime();
        return (await callApi(`/recordings/?since=${time}`)).recordings;
    }
    return (await callApi("/recordings/")).recordings;
}

