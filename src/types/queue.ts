export interface QueueItemRecording {
    time: Date;
    user: number;
    recording: number;
    type: "recording";
}

export interface QueueItemSound {
    time: Date;
    user: number;
    sound: number;
    type: "sound";
}

export interface QueueItemDialog {
    time: Date;
    user: number;
    type: "dialog";
}

export interface QueueItemCachedRecording {
    time: Date;
    user: number;
    cachedRecording: number;
    type: "cached";
}

export type QueueItem = QueueItemRecording | QueueItemSound | QueueItemDialog | QueueItemCachedRecording;
