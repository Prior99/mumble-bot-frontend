import * as React from "react";
import * as MdRecording from "react-icons/lib/md/mic";
import * as MdSound from "react-icons/lib/md/play-arrow";
import * as moment from "moment";
import { observer, inject } from "mobx-react";
import { Card, CardTitle, CardText } from "react-toolbox/lib/card";
import { List, ListItem } from "react-toolbox/lib/list";
import { QueueState } from "../../store/queue";
import { RecordingsState } from "../../store/recordings";
import { UsersState } from "../../store/users";
import { QueueItem } from "../../types";
import * as style from "./style.scss";

interface QueueItemElementProps {
    item: QueueItem;
    recordings: RecordingsState;
    users: UsersState;
}

function QueueItemElement(props: QueueItemElementProps) {
    const { item, recordings, users } = props;
    const { time, user: userId } = item;
    const user = users.getUser(userId);
    const legend = `Added ${moment(time).format("HH:mm:ss")} by ${user.username}.`;
    if (item.type === "recording") {
        const recording = recordings.getRecording(item.recording);
        return (
            <ListItem
                className={style.queueItem}
                leftIcon={<MdRecording />}
                caption={recording.quote}
                legend={legend}
            />
        );
    }
    if (item.type === "sound") {
        return (
            <ListItem
                className={style.queueItem}
                leftIcon={<MdSound />}
                caption={"TODO: Not yet implemented"}
                legend={legend}
            />
        );
    }
}

interface WidgetQueueProps {
    queue?: QueueState;
    recordings?: RecordingsState;
    users?: UsersState;
}

@inject("queue", "recordings", "users")
@observer
export class WidgetQueue extends React.Component<WidgetQueueProps, undefined> {
    public render() {
        const { queue: queueState, recordings, users } = this.props;
        const { queue } = this.props.queue;
        const items = queue.map(item => QueueItemElement({item, recordings, users}));
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