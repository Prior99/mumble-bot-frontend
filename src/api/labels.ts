import { callApi } from "./utils";
import { Label } from "../types";

export async function listLabels(): Promise<Label[]> {
    const response = await callApi("/recordings/labels");
    if (response) {
        return response.labels;
    }
}
