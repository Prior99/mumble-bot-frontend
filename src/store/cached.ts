import { observable, computed, action } from "mobx";
import { SHA256 } from "crypto-js";
import { checkAuth, saveCached } from "../api";
import { load } from "./utils";
import { CachedRecording } from "../types";
import { baseUrl } from "../../config";
import { callWebsocket } from "../api/utils";

interface MessageInit {
    type: "init";
    cacheAmount: number;
    list: CachedRecording[];
}

interface MessageAdd {
    type: "add";
    recording: CachedRecording;
}

interface MessageRemove {
    type: "remove";
    id: number;
}

interface MessageProtect {
    type: "protect";
    id: number;
}

export interface SaveState {
    id: number;
    name: string;
    labels: number[];
}

type Message = MessageInit | MessageAdd | MessageRemove | MessageProtect;

export class CachedState {
    @observable public allCachedRecordings: CachedRecording[] = [];
    @observable public cacheAmount: number = 0;
    @observable public saveState: SaveState;
    @observable public loading: Date;

    @computed
    public get saving() {
        return this.saveState !== undefined;
    }

    @action public startSaving = (id: number) => this.saveState = { id, name: "", labels: [] };

    @action public setSaveName = (name: string) => this.saveState.name = name;

    @action public addSaveLabel = (id: number) => this.saveState.labels.push(id);

    @action public removeSaveLabel = (id: number) =>
        this.saveState.labels = this.saveState.labels.filter(label => label !== id);

    @action public confirmSave = async () => {
        this.loading = new Date();
        await saveCached(this.saveState);
        this.saveState = undefined;
        this.loading = undefined;
    }

    @action public cancelSave = () => this.saveState = undefined;

    public getCachedRecording = (id: number) => this.allCachedRecordings.find(recording => recording.id === id);

    @computed
    public get sorted() {
        const sorted = [...this.allCachedRecordings];
        sorted.sort((a, b) => {
            if (b.protected && !a.protected) {
                return 1;
            }
            if (a.protected && !b.protected) {
                return -1;
            }
            return b.date.getTime() - a.date.getTime();
        });
        return sorted;
    }

    @action
    private handleInit = (message: MessageInit) => {
        const { list, cacheAmount } = message;
        this.allCachedRecordings = list.map(cached => ({ ...cached, date: new Date(cached.date) }));
        this.cacheAmount = cacheAmount;
    }

    @action
    private handleAdd = (message: MessageAdd) => {
        this.allCachedRecordings.push({
            ...message.recording,
            date: new Date(message.recording.date)
        });
    }

    @action
    private handleRemove = (message: MessageRemove) => {
        this.allCachedRecordings = this.allCachedRecordings.filter(recording => recording.id !== message.id);
    }

    @action
    private handleProtect = (message: MessageProtect) => {
        this.allCachedRecordings = this.allCachedRecordings.map(recording =>
            recording.id === message.id ? { ...recording, protected: true } : recording
        );
    }

    public init = async (): Promise<void> => {
        const socket = await callWebsocket("/recordings/cached/websocket");
        socket.addEventListener("message", event => {
            const message: Message = JSON.parse(event.data);
            if (message.type === "init") {
                return this.handleInit(message);
            }
            if (message.type === "add") {
                return this.handleAdd(message);
            }
            if (message.type === "remove") {
                return this.handleRemove(message);
            }
            if (message.type === "protect") {
                return this.handleProtect(message);
            }
        });
    }
}

export const cached = new CachedState();
