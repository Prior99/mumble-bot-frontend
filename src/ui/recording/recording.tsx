import * as React from "react";
import { inject, observer } from "mobx-react";
import { Recording } from "../../types";
import * as style from "./style.scss";
import { Card, CardText, CardActions } from "react-toolbox/lib/card";
import * as MdPlay from "react-icons/lib/md/volume-up.js";
import * as MdRecorder from "react-icons/lib/md/record-voice-over.js";
import * as MdSaver from "react-icons/lib/md/save.js";
import * as MdPlayLocal from "react-icons/lib/md/headset.js";
import * as MdDuration from "react-icons/lib/md/timer.js";
import * as MdSubmitted from "react-icons/lib/md/event.js";
import { Button } from "react-toolbox/lib/button";
import { baseUrl } from "../../../config";
import { play, preview } from "../../api";
import * as moment from "moment";
import "moment-duration-format";
import { Visualization } from "../visualization";
import { UsersState } from "../../store";
import { getRecordingVisualizationUrl } from "../../utils";

interface RecordingComponentProps {
    recording: Recording;
    users?: UsersState;
}

@inject("users")
@observer
export class RecordingComponent extends React.Component<RecordingComponentProps, undefined> {
    public render() {
        const { recording, users } = this.props;
        const { quote, id, duration, submitted, reporter: reporterId, user: userId, labels } = recording;
        const user = users.getUser(userId);
        const reporter = users.getUser(reporterId);
        const onPlay = () => play(id);
        const onPreview = () => preview(id);
        const labelElements = labels.map(label => <div>{label.name}</div>);
        return (
            <Card className={style.card}>
                <div className={style.container}>
                    <div className={style.content}>
                        <div className={style.leftContent}>
                            <div className={style.text}>
                                <div className={style.quote}>{quote}</div>
                                <div className={style.meta}>
                                    <div className={style.reporter}><MdRecorder /> {reporter ? reporter.username : "Unknown"}</div>
                                    <div className={style.user}><MdSaver /> {user ? user.username : "Unknown"}</div>
                                    <div className={style.submitted}><MdSubmitted /> {moment(submitted).format("YYYY-MM-DD")}</div>
                                    <div className={style.duration}><MdDuration /> {moment.duration(duration, "seconds").format("m [min] s [sec]", 2)}</div>
                                </div>
                            </div>
                            <Visualization
                                url={getRecordingVisualizationUrl(recording)}
                                duration={recording.duration}/ >
                        </div>
                        <div className={style.rightContent}>
                            <Button
                                onClick={onPlay}
                                icon={<MdPlay />}
                                label="Play"
                            />
                            <Button
                                onClick={onPreview}
                                icon={<MdPlayLocal />}
                                label="Preview"
                            />
                        </div>
                    </div>
                    <div className={style.bar}>
                        <div className={style.labels}>{labelElements}</div>
                    </div>
                </div>
            </Card>
        );
    }
}
