import { observable, computed, action } from "mobx";
import { listLabels } from "../api";
import { Label } from "../types";

export class LabelsState {
    @observable public labels: Label[] = [];
    @observable public loading: Date;

    @action
    public load = async (): Promise<void> => {
        this.loading = new Date();
        const labels = await listLabels();
        this.loading = undefined;
        this.labels = labels;
    }

    @computed
    public get sorted() {
        const copy = [...this.labels];
        copy.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ?  1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0
        );
        return copy;
    }

    public getLabel = (id: number): Label => {
        return this.labels.find(user => user.id === id);
    }

    @computed
    public get mostUsed() {
        return this.labels.reduce((result, label) => label.recordings > result.recordings || !result ? label : result);
    }

    public getRelevance(label: Label): number {
        return label.recordings / this.mostUsed.recordings;
    }

    @computed
    public get labelsSource() {
        return this.sorted.map(label => ({ value: label.id, label: label.name }));
    }
}

export const labels = new LabelsState();
