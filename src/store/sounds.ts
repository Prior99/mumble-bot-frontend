import { observable, computed, action } from "mobx";
import { listSounds } from "../api";
import { Recording } from "../types/recordings";
import { Sound } from "../types";
import { filter } from "fuzzaldrin";

const REFRESH_INTERVAL = 3000;

export class SoundsState {
    @observable public allSounds: Sound[] = [];
    @observable private lastRefresh: Date;
    @observable public loading: Date;
    @observable public query = "";

    public getSound = (id: number) => this.allSounds.find(sound => sound.id === id);

    @computed
    public get visibleSounds() {
        const { query, allSounds } = this;
        if (query === "") {
            return allSounds;
        }
        return filter(allSounds, query, { key: "name" });
    }

    @action
    public filter = (query: string) => this.query = query

    @action
    public refresh = async () => {
        this.loading = new Date();
        const sounds = await listSounds();
        this.loading = undefined;
        this.allSounds = sounds;
        this.lastRefresh = new Date();
        setTimeout(this.refresh, REFRESH_INTERVAL);
    }

    public load = this.refresh;
}

export const sounds = new SoundsState();
