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
    @observable public records: Record[] = [];
    @observable private lastRefresh: Date;
    @observable public refreshing: boolean = false;

    @action
    public loadStorage = async () => {
        const jsonStorageState = localStorage.getItem(localStorageIdentifier);
        if (jsonStorageState) {
            const storageState: StorageState = JSON.parse(jsonStorageState);
            this.records = storageState.records;
            this.lastRefresh = new Date(storageState.lastRefresh);
        }
        await this.refresh();
    }

    private storeStorage = () => {
        const jsonStorageState = JSON.stringify({
            version: localStorageVersion,
            records: this.records,
            lastRefresh: this.lastRefresh.toString()
        });
        localStorage.setItem(localStorageIdentifier, jsonStorageState);
    }

    @action
    public refresh = async () => {
        this.refreshing = true;
        const records = await listRecords(this.lastRefresh);
        this.refreshing = false;
        this.records = records;
        this.lastRefresh = new Date();
    }
}

export const recordsState = new RecordsState();
