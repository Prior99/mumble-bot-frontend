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
import * as MdStarEmpty from "react-icons/lib/md/star-border.js";
import * as MdStarFilled from "react-icons/lib/md/star.js";
import * as MdSave from "react-icons/lib/md/save.js";
import { Button } from "react-toolbox/lib/button";
import { baseUrl } from "../../../config";
import { playCached, previewCached, protectCached, deleteCached } from "../../api";
import * as moment from "moment";
import "moment-duration-format";
import { Visualization } from "../visualization";
import { UsersState, CachedState } from "../../store";
import { getCachedVisualizationUrl } from "../../utils";

interface CachedComponentProps {
    cachedRecording: CachedRecording;
    cached?: CachedState;
    users?: UsersState;
}

@inject("users", "cached")
@observer
export class CachedComponent extends React.Component<CachedComponentProps, undefined> {
    public render() {
        const { cached, cachedRecording, users } = this.props;
        const { startSaving } = cached;
        const { id, duration, user: userId, date, protected: isProtected } = cachedRecording;
        const user = users.getUser(userId);
        const onPlay = () => playCached(id);
        const onPreview = () => previewCached(id);
        const onProtect = () => protectCached(id);
        const onDelete = () => deleteCached(id);
        const onSave = () => startSaving(id);
        return (
            <Card className={style.card}>
                <div className={style.container}>
                    <div className={style.leftContent}>
                        <div>
                            {
                                isProtected ?
                                    <MdStarFilled className={style.protect} onClick={onDelete} /> :
                                    <MdStarEmpty className={style.protect} onClick={onProtect}/>
                            }
                        </div>
                        <div className={style.meta}>
                            <div className={style.user}><MdRecorder /> {user ? user.username : "Unknown"}</div>
                            <div className={style.submitted}><MdSubmitted /> {moment(date).format("HH:mm:ss")}</div>
                            <div className={style.duration}><MdDuration /> {moment.duration(duration, "seconds").format("m [min] s [sec]", 2)}</div>
                        </div>
                        <Visualization url={getCachedVisualizationUrl(cachedRecording)} duration={duration}/ >
                    </div>
                    <div className={style.rightContent}>
                        <Button
                            icon={<MdSave />}
                            label="Save"
                            onClick={onSave}
                        />
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
