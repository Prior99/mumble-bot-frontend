import { callApi, playAudio } from "./utils";
import { login } from "../store";
import { baseUrl } from "../../config";

export async function playCached(id: number): Promise<void> {
    await callApi(`/recordings/cached/${id}/play`);
}

export async function protect(id: number): Promise<void> {
    await callApi(`/recordings/cached/${id}/protect`);
}

export async function removeCached(id: number): Promise<void> {
    await callApi(`/recordings/cached/${id}`, undefined, "DELETE");
}

export function previewCached(id: number) {
   playAudio(`//${baseUrl}/recordings/cached/${id}/download`);
}
