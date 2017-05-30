import { observable, computed, action } from "mobx";
import { UploadingSound, UploadingState } from "../types";
import { uploadSound } from "../api";

const REFRESH_INTERVAL = 3000;

function isFileNameValid(name: string): boolean {
    const lowerCase = name.toLowerCase();
    return lowerCase.endsWith("mp3") ||
        lowerCase.endsWith("ogg") ||
        lowerCase.endsWith("wav") ||
        lowerCase.endsWith("flac") ||
        lowerCase.endsWith("aac") ||
        lowerCase.endsWith("ac3");
}

export class SoundUploadState {
    @observable public uploading: UploadingSound[] = [];
    @observable public working = false;

    @action
    public addFiles = (files: FileList) => {
        for (let i = 0; i < files.length; ++i) {
            const file = files.item(i);
            if (isFileNameValid(file.name)) {
                this.uploading.push({
                    state: UploadingState.PENDING,
                    file
                });
            }
        }
        if (!this.working) {
            this.next();
        }
    }

    private next = async (): Promise<void> => {
        let file: UploadingSound;
        this.working = true;
        while (file = this.uploading.find(item => item.state === UploadingState.PENDING)) {
            file.state = UploadingState.UPLOADING;
            await uploadSound(file.file);
            file.state = UploadingState.DONE;
        }
        this.working = false;
    }
}

export const soundUpload = new SoundUploadState();
