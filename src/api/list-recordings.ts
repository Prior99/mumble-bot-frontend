import { callApi } from "./utils";
import { Recording } from "../types";

export async function listRecordings(since?: Date): Promise<Recording[]> {
    const time = since ? since.getTime() : undefined;
    const url = since ? `/recordings/?since=${time}` : `/recordings`;
    const response = await callApi(url);
    if (response) {
        return response.recordings;
    }
}
