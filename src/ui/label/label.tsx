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
        const color = colorize(name, 1, 0.5 + (1.0 - relevance) * 0.5);
        return (
            <div className={style.label} style={{ background: color }}>
                <div className={style.amount}>
                    {recordings}
                </div>
                <div className={style.name}>
                    {name}
                </div>
            </div>
        );
    }
}
