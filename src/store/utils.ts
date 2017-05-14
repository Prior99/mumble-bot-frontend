import { recordings }  from "./recordings";

export async function load() {
    await recordings.loadStorage();
}
