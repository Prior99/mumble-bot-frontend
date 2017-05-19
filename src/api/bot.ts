import { callApi } from "./utils";
import { login, SaveState } from "../store";
import { baseUrl } from "../../config";

export async function shutUp(): Promise<void> {
    await callApi(`/shut-up`, undefined, "POST");
}
