import { observable, computed, action } from "mobx";
import { listRecordings } from "../api";
import { Recording } from "../types/recordings";

const localStorageIdentifier = "mumble-bot-recordings-state";
const localStorageVersion = 1;
const REFRESH_INTERVAL = 3000;

interface StorageState {
    version: number;
    lastRefresh: string;
    recordings: Recording[];
}

export class RecordingsState {
    @observable public allRecordings: Recording[] = [];
    @observable private lastRefresh: Date;
    @observable public loading: Date;
    @observable public query: string = "";

    @action
    public loadStorage = async () => {
        const jsonStorageState = localStorage.getItem(localStorageIdentifier);
        if (jsonStorageState) {
            const storageState: StorageState = JSON.parse(jsonStorageState);
            this.allRecordings = storageState.recordings;
            this.lastRefresh = new Date(storageState.lastRefresh);
        }
        await this.refresh();
    }

    public getRecording = (id: number) => this.allRecordings.find(recording => recording.id === id);

    @computed
    public get visibleRecordings() {
        const { query, allRecordings } = this;
        if (query === "") {
            return allRecordings;
        }
        return allRecordings.filter(recording => recording.quote.toLowerCase().includes(query.toLowerCase()));
    }

    @action
    public filter = (query: string) => this.query = query;

    private storeStorage = () => {
        const jsonStorageState = JSON.stringify({
            version: localStorageVersion,
            recordings: this.allRecordings,
            lastRefresh: this.lastRefresh.toString()
        });
        localStorage.setItem(localStorageIdentifier, jsonStorageState);
    }

    @action
    public refresh = async () => {
        this.loading = new Date();
        const recordings = await listRecordings(this.lastRefresh);
        this.loading = undefined;
        this.allRecordings = [...this.allRecordings, ...recordings];
        this.lastRefresh = new Date();
        this.storeStorage();
        setTimeout(this.refresh, REFRESH_INTERVAL);
    }
}

export const recordings = new RecordingsState();
