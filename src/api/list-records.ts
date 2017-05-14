import { callApi } from "./utils";
import { Record } from "../types";

export async function listRecords(since?: Date): Promise<Record[]> {
    if (since) {
        const time = since.getTime();
        return (await callApi(`/records/?since=${time}`)).records;
    }
    return (await callApi("/records/")).records;
}
