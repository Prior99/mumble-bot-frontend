import { callApi } from "./utils";
import { Recording } from "../types";

export async function play(recordingId: number): Promise<void> {
    await callApi(`/recordings/${recordingId}/play`);
}


