import { observable, computed, action } from "mobx";
import { listLabels } from "../api";
import { Label } from "../types";

export class LabelsState {
    @observable public labels: Label[] = [];
    @observable public refreshing: boolean = false;

    @action
    public load = async (): Promise<void> => {
        this.refreshing = true;
        const labels = await listLabels();
        this.refreshing = false;
        this.labels = labels;
    }

    public getLabel(id: number): Label {
        return this.labels.find(user => user.id === id);
    }

    @computed
    public get mostUsed() {
        return this.labels.reduce((result, label) => label.recordings > result.recordings || !result ? label : result);
    }

    public getRelevance(label: Label): number {
        return label.recordings / this.mostUsed.recordings;
    }
}

export const labels = new LabelsState();
