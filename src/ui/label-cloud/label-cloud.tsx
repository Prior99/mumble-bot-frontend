import * as React from "react";
import { inject, observer } from "mobx-react";
import { LabelsState } from "../../store";
import { LabelComponent } from "../";
import { Label } from "../../types";
import * as style from "./style.scss";

export interface LabelCloudProps {
    labels?: LabelsState;
    onLabelSelect: (id: number) => void;
    selectedLabels: number[];
    mode: "selected" | "unselected";
    icon: JSX.Element;
}

@inject("labels")
@observer
export class LabelCloud extends React.Component<LabelCloudProps, undefined> {
    public render() {
        const { labels, onLabelSelect, selectedLabels, mode, icon } = this.props;
        const { sorted } = labels;
        const labelsToDisplay = mode === "selected" ?
            sorted.filter(label => selectedLabels.includes(label.id)) :
            sorted.filter(label => !selectedLabels.includes(label.id));
        const elements = labelsToDisplay.map(label => (
            <LabelComponent id={label.id} amount key={label.id} onClick={() => onLabelSelect(label.id)} icon={icon} />
        ));
        return (
            <div className={style.container}>
                {elements}
            </div>
        );
    }
}
