import { callApi } from "./utils";
import { User } from "../types";

export async function listUsers(): Promise<User[]> {
    const response = await callApi("/users");
    if (response) {
        return response.users;
    }
}

