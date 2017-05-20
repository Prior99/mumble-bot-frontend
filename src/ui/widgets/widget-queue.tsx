import * as React from "react";
import * as MdRecording from "react-icons/lib/md/mic";
import * as MdSound from "react-icons/lib/md/play-arrow";
import * as MdCached from "react-icons/lib/md/cached";
import * as MdDialog from "react-icons/lib/md/list";
import * as moment from "moment";
import { observer, inject } from "mobx-react";
import { Card, CardTitle, CardText } from "react-toolbox/lib/card";
import { List, ListItem } from "react-toolbox/lib/list";
import { QueueState } from "../../store/queue";
import { RecordingsState } from "../../store/recordings";
import { UsersState } from "../../store/users";
import { QueueItem } from "../../types";
import * as style from "./style.scss";
import { CachedState, SoundsState } from "../../store";

interface QueueItemElementProps {
    item: QueueItem;
    recordings: RecordingsState;
    users: UsersState;
    cached: CachedState;
    sounds: SoundsState;
}

function QueueItemElement(props: QueueItemElementProps) {
    const { item, recordings, users, cached, sounds } = props;
    const { time, user: userId } = item;
    const user = users.getUser(userId);
    const legend = `Added ${moment(time).format("HH:mm:ss")} by ${user.username}.`;
    if (item.type === "recording") {
        const recording = recordings.getRecording(item.recording);
        return (
            <ListItem
                className={style.queueItem}
                theme={{ itemText: style.text } as any}
                leftIcon={<MdRecording />}
                caption={recording.quote}
                legend={legend}
            />
        );
    }
    if (item.type === "sound") {
        const sound = sounds.getSound(item.sound);
        return (
            <ListItem
                className={style.queueItem}
                theme={{ itemText: style.text } as any}
                leftIcon={<MdSound />}
                caption={sound.name}
                legend={legend}
            />
        );
    }
    if (item.type === "cached") {
        const cachedRecording = cached.getCachedRecording(item.cachedRecording);
        const recorder = users.getUser(cachedRecording.user);
        return (
            <ListItem
                className={style.queueItem}
                theme={{ itemText: style.text } as any}
                leftIcon={<MdCached />}
                caption={`${moment(cachedRecording.date).format("HH:mm:ss")} by ${recorder.username}`}
                legend={legend}
            />
        );
    }
    if (item.type === "dialog") {
        return (
            <ListItem
                className={style.queueItem}
                theme={{ itemText: style.text } as any}
                leftIcon={<MdDialog />}
                caption={"Dialog part"}
                legend={legend}
            />
        );
    }
}

interface WidgetQueueProps {
    queue?: QueueState;
    recordings?: RecordingsState;
    users?: UsersState;
    cached?: CachedState;
    sounds?: SoundsState;
}

@inject("queue", "recordings", "users", "cached", "sounds")
@observer
export class WidgetQueue extends React.Component<WidgetQueueProps, undefined> {
    public render() {
        const { queue: queueState, recordings, users, cached, sounds } = this.props;
        const { queue } = this.props.queue;
        const items = queue.map(item => QueueItemElement({ item, recordings, users, cached, sounds }));
        return (
            <Card>
                <CardTitle>Queue</CardTitle>
                <List>
                    {items.length > 0 ? items : <CardText>It appears to be empty.</CardText>}
                </List>
            </Card>
        );
    }
}
