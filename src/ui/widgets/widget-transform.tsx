import * as React from "react";
import * as MdEqualizer from "react-icons/lib/md/equalizer";
import { observer, inject } from "mobx-react";
import { Card, CardTitle, CardText } from "react-toolbox/lib/card";
import Slider from "react-toolbox/lib/slider";
import { isDisconnected } from "../../store/utils";
import { RecordingsState } from "../../store";

@inject("recordings")
@observer
export class WidgetTransform extends React.Component<{ recordings?: RecordingsState }, undefined> {
    public render() {
        const { pitch, setPitch } = this.props.recordings;
        return (
            <Card>
                <CardTitle style={{ fontSize: "24px" }}><MdEqualizer /> Transform</CardTitle>
                <CardText>
                    <p>Pitch</p>
                    <Slider value={pitch} min={-600} max={600} onChange={setPitch} />
                </CardText>
            </Card>
        );
    }
}
