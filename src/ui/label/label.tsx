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
    onClick?: () => void;
    icon?: JSX.Element;
}

@inject("labels")
@observer
export class LabelComponent extends React.Component<LabelComponentProps, undefined> {
    public render() {
        const { id, labels, amount, onClick, icon } = this.props;
        const label = labels.getLabel(id);
        if (!label) {
            return null; // tslint:disable-line
        }
        const { recordings, name } = label;
        const relevance = labels.getRelevance(label);
        const paleColor = colorize(name, 1, 0.7 + (1.0 - relevance) * 0.3);
        const extraPaleColor = colorize(name, 1, 0.8 + (1.0 - relevance) * 0.2);
        const nameColor = colorize(name, 0.3, 0.3 + (1.0 - relevance) * 0.4);
        const computedStyle = {
            background: paleColor,
            // boxShadow: `${extraPaleColor} 0px 0px 5px 2px`,
            border: `1px solid ${extraPaleColor}`,
            cursor: onClick && "pointer"
        };
        const amountClassName = icon ? `${style.amount} ${style.hoverAmount}` : style.amount;
        return (
            <div className={style.label} style={computedStyle} onClick={onClick}>
                {
                    amount &&
                    <div className={amountClassName} style={{ background: extraPaleColor, color: nameColor }}>
                        <div className={style.text}>
                            {recordings}
                        </div>
                        <div className={style.icon}>
                            {icon}
                        </div>
                    </div>
                }
                <div className={style.name} style={{ color: nameColor, marginLeft: !amount && "10px" }}>
                    {name}
                </div>
            </div>
        );
    }
}
