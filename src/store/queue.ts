import { observable, computed, action } from "mobx";
import { SHA256 } from "crypto-js";
import { checkAuth, saveCached } from "../api";
import { load } from "./utils";
import { CachedRecording } from "../types";
import { baseUrl } from "../../config";
import { callWebsocket } from "../api/utils";
import { QueueItem } from "../types/queue";

interface MessageInit {
    type: "init";
    queue: QueueItem[];
}

interface MessageEnqueue {
    type: "enqueue";
    workitem: QueueItem;
}

interface MessageDequeue {
    type: "dequeue";
}

interface MessageClear {
    type: "clear";
}

type Message = MessageInit | MessageEnqueue | MessageDequeue | MessageClear;

export class QueueState {
    @observable public queue: QueueItem[] = [];

    @action
    private handleInit = (message: MessageInit) => {
        const { queue } = message;
        this.queue = queue.map(queueItem => ({ ...queueItem, time: new Date(queueItem.time) }));
    };

    @action
    private handleEnqueue = (message: MessageEnqueue) => {
        this.queue.push({
            ...message.workitem,
            time: new Date(message.workitem.time)
        });
    };

    @action
    private handleDequeue = (message: MessageDequeue) => {
        this.queue.shift();
    };

    @action
    private handleClear = (message: MessageClear) => {
        this.queue = [];
    };

    public init = async (): Promise<void> => {
        const socket = await callWebsocket("/queue");
        socket.addEventListener("message", event => {
            const message: Message = JSON.parse(event.data);
            if (message.type === "init") {
                return this.handleInit(message);
            }
            if (message.type === "enqueue") {
                return this.handleEnqueue(message);
            }
            if (message.type === "dequeue") {
                return this.handleDequeue(message);
            }
            if (message.type === "clear") {
                return this.handleClear(message);
            }
        });
    };
}

export const queue = new QueueState();

