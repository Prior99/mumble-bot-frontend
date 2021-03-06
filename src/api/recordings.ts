import { callApi, playAudio } from "./utils";
import { Recording } from "../types";

declare var baseUrl: string;

export async function listRecordings(since?: Date): Promise<Recording[]> {
    const time = since ? since.getTime() : undefined;
    const url = since ? `/recordings/?since=${time}` : `/recordings`;
    const response = await callApi(url);
    if (response) {
        return response.recordings;
    }
}

export async function play(recordingId: number, pitch = 0): Promise<void> {
    await callApi(`/recordings/${recordingId}/play`, { pitch }, "POST");
}

export function preview(id: number) {
   playAudio(`//${baseUrl}/recordings/${id}/download`);
}
