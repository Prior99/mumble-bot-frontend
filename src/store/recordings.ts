import { observable, computed, action } from "mobx";
import { listRecordings } from "../api";
import { Recording } from "../types/recordings";

const localStorageIdentifier = "mumble-bot-recordings-state";
const localStorageVersion = 1;

interface StorageState {
    version: number;
    lastRefresh: string;
    recordings: Recording[];
}

export class RecordingsState {
    @observable public allRecordings: Recording[] = [];
    @observable private lastRefresh: Date;
    @observable public refreshing: boolean = false;
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
        this.refreshing = true;
        const recordings = await listRecordings(this.lastRefresh);
        this.refreshing = false;
        this.allRecordings = [...this.allRecordings, ...recordings];
        this.lastRefresh = new Date();
        this.storeStorage();
    }
}

export const recordings = new RecordingsState();
