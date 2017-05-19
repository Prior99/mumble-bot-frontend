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

export type QueueItem = QueueItemRecording | QueueItemSound;
