import * as React from "react";
import { inject, observer } from "mobx-react";
import { RecordingsState } from "../../store/recordings";
import { RecordingComponent, Query } from "../../ui";
import Infinite = require("react-infinite"); // tslint:disable-line
import * as style from "./style.scss";

@inject("recordings")
@observer
export class PageRecordings extends React.Component<{ recordings?: RecordingsState }, undefined> {
    public render() {
        const recordings = this.props.recordings.visibleRecordings.map(recording => (
            <RecordingComponent recording={recording} key={recording.id} />
        ));
        return (
            <div>
                <Query />
                <div className={style.container}>
                    <Infinite elementHeight={160} useWindowAsScrollContainer>
                        {recordings}
                    </Infinite>
                </div>
            </div>
        );
    }
}
