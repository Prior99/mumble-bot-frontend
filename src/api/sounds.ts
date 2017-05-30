import { callApi } from "./utils";
import { Sound } from "../types";

export async function listSounds(): Promise<Sound[]> {
    const url = "/sounds";
    const response = await callApi(url);
    if (response) {
        return response.sounds;
    }
}

export async function playSound(soundId: number): Promise<void> {
    await callApi(`/sounds/${soundId}/play`, undefined, "POST");
}

export function uploadSound(file: File): Promise<{}> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
            const body = {
                name: file.name,
                data: btoa(reader.result)
            };
            await callApi("/sounds", body, "PUT");
            resolve();
        });
        reader.readAsBinaryString(file);
    });
}
