import { callApi } from "./utils";
import { User } from "../types";
import { MumbleUser, users } from "../store";

export async function listUsers(): Promise<User[]> {
    const response = await callApi("/users");
    if (response) {
        return response.users;
    }
}

export async function listFreeUsers(): Promise<MumbleUser[]> {
    const response = await callApi("/users/mumble/free-users");
    if (response) {
        return response.users;
    }
}

export async function linkUser(mumbleId: number): Promise<void> {
    const response = await callApi("/users/mumble/link", {
        mumbleId,
        userId: users.ownUser.id
    }, "POST");
}
