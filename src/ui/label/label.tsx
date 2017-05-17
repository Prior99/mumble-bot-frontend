import * as React from "react";
import { inject, observer } from "mobx-react";
import { Label } from "../../types";
import * as style from "./style.scss";
import { LabelsState } from "../../store";
import { colorize } from "../../utils";

interface LabelComponentProps {
    id: number;
    labels?: LabelsState;
    amount?: boolean;
}

@inject("labels")
@observer
export class LabelComponent extends React.Component<LabelComponentProps, undefined> {
    public render() {
        const { id, labels, amount } = this.props;
        const label = labels.getLabel(id);
        const { recordings, name } = label;
        const relevance = labels.getRelevance(label);
        const paleColor = colorize(name, 1, 0.8 + (1.0 - relevance) * 0.2);
        const extraPaleColor = colorize(name, 1, 0.9 + (1.0 - relevance) * 0.1);
        const nameColor = colorize(name, 0.5, 0.4);
        return (
            <div className={style.label} style={{ background: paleColor, boxShadow: `${extraPaleColor} 0px 0px 5px 2px` }}>
                {
                    amount &&
                    <div className={style.amount} style={{ background: extraPaleColor, color: nameColor }}>
                        {recordings}
                    </div>
                }
                <div className={style.name} style={{ color: nameColor, marginLeft: !amount && "10px" }}>
                    {name}
                </div>
            </div>
        );
    }
}
