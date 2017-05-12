import { callApi } from "./utils";
import { Record } from "../types";

export async function listRecords(since?: Date): Promise<Record[]> {
    if (since) {
        const time = since.getTime();
        return (await callApi(`/record/list?since=${time}`)).records;
    }
    return (await callApi("/record/list")).records;
}
