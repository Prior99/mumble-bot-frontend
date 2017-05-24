import { login } from "../store";

declare var baseUrl: string;

type HTTPMethod = "DELETE" | "GET" | "PUT" | "POST";

export async function callApi(url: string, body?: any, method: HTTPMethod = "GET"): Promise<any> {
    const headers = new Headers();
    headers.append("authorization", login.authToken);
    headers.append("content-type", "application/json");
    const response = await fetch(`//${baseUrl}${url}`, {
        method,
        headers,
        body: JSON.stringify(body)
    });
    return (await response.json()).data;
}

export async function checkAuth(): Promise<boolean> {
    const headers = new Headers();
    headers.append("authorization", login.authToken);
    try {
        const response = await fetch(`${window.location.protocol}//${baseUrl}/authorized`, {
            method: "GET",
            headers
        });
        return response.status === 200;
    } catch (err) {
        return false;
    }
}

export function callWebsocket(url: string): Promise<WebSocket> {
    return new Promise((resolve) => {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const websocket = new WebSocket(`${protocol}//${baseUrl}${url}`, [login.username, login.encryptedPassword]);
        websocket.addEventListener("open", () => {
            resolve(websocket);
        });
    });
}

export function playAudio(url: string): Promise<undefined> {
    return new Promise(async (resolve) => {
        const headers = new Headers();
        headers.append("authorization", login.authToken);
        const response = await fetch(url, {
            method: "GET",
            headers
        });
        const blob = await response.blob();
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const wrongMime = "data:text/plain;base64";
            const correctMime = "data:audio/mpeg;base64";
            const fixedMime = `${correctMime}${reader.result.substr(wrongMime.length)}`;
            new Audio(fixedMime).play();
            resolve();
        });
        reader.readAsDataURL(blob);
    });
}
