import { observable, computed, action } from "mobx";
import { UploadingSound } from "../types";

const REFRESH_INTERVAL = 3000;

export class SoundUploadState {
    @observable public uploading: UploadingSound[] = [];

    public getSound = (id: number) => this.allSounds.find(sound => sound.id === id);

    @computed
    public get visibleSounds() {
        const { query, allSounds } = this;
        if (query === "") {
            return allSounds;
        }
        return filter(allSounds, query, { key: "name" });
    }


    public load = this.refresh;
}

export const soundUpload = new SoundUploadState();
