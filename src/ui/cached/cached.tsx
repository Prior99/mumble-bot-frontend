import * as React from "react";
import { inject, observer } from "mobx-react";
import { Recording, CachedRecording } from "../../types";
import * as style from "./style.scss";
import { Card, CardText, CardActions } from "react-toolbox/lib/card";
import * as MdPlay from "react-icons/lib/md/volume-up.js";
import * as MdRecorder from "react-icons/lib/md/record-voice-over.js";
import * as MdPlayLocal from "react-icons/lib/md/headset.js";
import * as MdDuration from "react-icons/lib/md/timer.js";
import * as MdSubmitted from "react-icons/lib/md/event.js";
import { Button } from "react-toolbox/lib/button";
import { baseUrl } from "../../../config";
import { playCached, previewCached } from "../../api";
import * as moment from "moment";
import "moment-duration-format";
import { Visualization } from "../visualization";
import { UsersState } from "../../store";
import { getCachedVisualizationUrl } from "../../utils";

interface CachedComponentProps {
    cached: CachedRecording;
    users?: UsersState;
}

@inject("users")
@observer
export class CachedComponent extends React.Component<CachedComponentProps, undefined> {
    public render() {
        const { cached, users } = this.props;
        const { id, duration, user: userId, date } = cached;
        const user = users.getUser(userId);
        const onPlay = () => playCached(id);
        const onPreview = () => previewCached(id);
        console.log(duration);
        return (
            <Card className={style.card}>
                <div className={style.container}>
                    <div className={style.leftContent}>
                        <div className={style.meta}>
                            <div className={style.user}><MdRecorder /> {user ? user.username : "Unknown"}</div>
                            <div className={style.submitted}><MdSubmitted /> {moment(date).format("HH:mm:ss")}</div>
                            <div className={style.duration}><MdDuration /> {moment.duration(duration, "seconds").format("m [min] s [sec]", 2)}</div>
                        </div>
                        <Visualization url={getCachedVisualizationUrl(cached)} duration={duration}/ >
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
            </Card>
        );
    }
}
