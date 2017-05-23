import { callApi, playAudio } from "./utils";
import { login, SaveState } from "../store";

declare var baseUrl: string;

export async function playCached(id: number): Promise<void> {
    await callApi(`/recordings/cached/${id}/play`, undefined, "POST");
}

export async function protectCached(id: number): Promise<void> {
    await callApi(`/recordings/cached/${id}/protect`, undefined, "POST");
}

export async function deleteCached(id: number): Promise<void> {
    await callApi(`/recordings/cached/${id}`, undefined, "DELETE");
}

export function previewCached(id: number) {
   playAudio(`//${baseUrl}/recordings/cached/${id}/download`);
}

export async function saveCached(save: SaveState) {
    await callApi(`/recordings/cached/${save.id}/save`, { quote: save.name, labels: save.labels }, "POST");
}
