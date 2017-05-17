import * as React from "react";
import { inject, observer } from "mobx-react";
import { Label } from "../../types";
import * as style from "./style.scss";
import { LabelsState } from "../../store";
import { colorize } from "../../utils";

@inject("labels")
@observer
export class LabelComponent extends React.Component<{ id: number, labels?: LabelsState }, undefined> {
    public render() {
        const { id, labels } = this.props;
        const label = labels.getLabel(id);
        const { recordings, name } = label;
        const relevance = labels.getRelevance(label);
        const paleColor = colorize(name, 1, 0.8 + (1.0 - relevance) * 0.2);
        const strongColor = colorize(name, 1, 0.5 + (1.0 - relevance) * 0.2);
        const nameColor = colorize(name, 0.8, 0.5);
        const amountColor = colorize(name, 0.8, 0.9);
        return (
            <div className={style.label} style={{ background: paleColor, border: `1px solid ${strongColor}` }}>
                <div className={style.amount} style={{ background: strongColor, color: amountColor }}>
                    {recordings}
                </div>
                <div className={style.name} style={{ color: nameColor }}>
                    {name}
                </div>
            </div>
        );
    }
}
