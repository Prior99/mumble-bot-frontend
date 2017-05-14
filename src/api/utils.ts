import { login } from "../store";
import { baseUrl } from "../../config";

export async function callApi(url: string, body?: any): Promise<any> {
    const headers = new Headers();
    headers.append("authorization", login.authToken);
    const response = await fetch(`${baseUrl}${url}`, {
        method: "GET",
        headers,
        body: JSON.stringify(body)
    });
    return await response.json();
}

export async function checkAuth(): Promise<boolean> {
    const headers = new Headers();
    headers.append("authorization", login.authToken);
    try {
        const response = await fetch(`${baseUrl}/authorized`, {
            method: "GET",
            headers
        });
        return response.status === 200;
    } catch (err) {
        return false;
    }
}
