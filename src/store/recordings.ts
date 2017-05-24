import { observable, computed, action } from "mobx";
import { listRecordings } from "../api";
import { Recording } from "../types/recordings";
import { filter } from "fuzzaldrin";

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
    @observable public filterUsers: number[] = [];
    @observable public filterLabels: number[] = [];

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
    public get sorted() {
        const copy = [...this.allRecordings];
        copy.sort((a, b) =>
            a.changed < b.changed ?  1 : b.changed < a.changed ? -1 : 0
        );
        return copy;
    }

    @computed
    public get visibleRecordings() {
        const { query, filterUsers, filterLabels, sorted } = this;
        let filteredRecordings = sorted;
        if (query !== "") {
            filteredRecordings = filter(filteredRecordings, query, { key: "quote" });
        }
        if (filterUsers && filterUsers.length > 0) {
            filteredRecordings = filteredRecordings.filter(recording => filterUsers.includes(recording.user));
        }
        if (filterLabels && filterLabels.length > 0) {
            filteredRecordings = filteredRecordings.filter(recording =>
                filterLabels.every(tag => recording.labels.includes(tag))
            );
        }
        return filteredRecordings;
    }

    @action
    public filter = (query: string) => this.query = query;

    @action
    public addFilterUser = (user: number) => this.filterUsers.push(user);

    @action
    public removeFilterUser = (userId: number) =>
        this.filterUsers = this.filterUsers.filter(user => user !== userId);

    @action
    public addFilterLabel = (label: number) => this.filterLabels.push(label);

    @action
    public removeFilterLabel = (labelId: number) =>
        this.filterLabels = this.filterLabels.filter(label => label !== labelId);

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

    public getRandomVisible = (): Recording => {
        const rand = Math.floor(Math.random() * this.visibleRecordings.length);
        return this.visibleRecordings[rand];
    }

}

export const recordings = new RecordingsState();
