import { callApi } from "./utils";
import { Record } from "../types";

export async function play(recordId: number): Promise<void> {
    await callApi(`/record/play?id=${recordId}`);
}

