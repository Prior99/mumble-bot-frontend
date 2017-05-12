import { observable, computed, action } from "mobx";
import { listRecords } from "../api";
import { Record } from "../types/record";

const localStorageIdentifier = "mumble-bot-records-state";
const localStorageVersion = 1;

interface StorageState {
    version: number;
    lastRefresh: string;
    records: Record[];
}

export class RecordsState {
    @observable public allRecords: Record[] = [];
    @observable private lastRefresh: Date;
    @observable public refreshing: boolean = false;
    @observable public query: string = "";

    @action
    public loadStorage = async () => {
        const jsonStorageState = localStorage.getItem(localStorageIdentifier);
        if (jsonStorageState) {
            const storageState: StorageState = JSON.parse(jsonStorageState);
            this.allRecords = storageState.records;
            this.lastRefresh = new Date(storageState.lastRefresh);
        }
        await this.refresh();
    }

    @computed
    public get visibleRecords() {
        const { query, allRecords } = this;
        if (query === "") {
            return allRecords;
        }
        return allRecords.filter(record => record.quote.toLowerCase().includes(query.toLowerCase()));
    }

    @action
    public filter = (query: string) => this.query = query;

    private storeStorage = () => {
        const jsonStorageState = JSON.stringify({
            version: localStorageVersion,
            records: this.allRecords,
            lastRefresh: this.lastRefresh.toString()
        });
        localStorage.setItem(localStorageIdentifier, jsonStorageState);
    }

    @action
    public refresh = async () => {
        this.refreshing = true;
        const records = await listRecords(this.lastRefresh);
        this.refreshing = false;
        this.allRecords = records;
        this.lastRefresh = new Date();
    }
}

export const recordsState = new RecordsState();
