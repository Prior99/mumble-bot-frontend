import { loginState } from "../store";
import { baseUrl } from "../../config";

export async function callApi(url: string, body: Object): Promise<Object> {
    const headers = new Headers();
    headers.append("authorization", loginState.authToken);
    const response = await fetch(`${baseUrl}${url}`, {
        method: "GET",
        headers
    });
    return await response.json();
}

export async function checkAuth(): Promise<boolean> {
    const headers = new Headers();
    headers.append("authorization", loginState.authToken);
    try {
        const response = await fetch(`${baseUrl}/user/usernameAvailable`, {
            method: "GET",
            headers
        });
        return response.status === 200;
    } catch(err) {
        return false;
    }
}
