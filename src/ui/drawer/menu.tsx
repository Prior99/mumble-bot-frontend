import * as React from "react";
import { browserHistory } from "react-router";
import * as MdRecords from "react-icons/lib/md/mic.js";
import * as MdCached from "react-icons/lib/md/cached.js";
import { List, ListItem } from "react-toolbox/lib/list";
import { routeCached, routeRecordings } from "../../routing";

export class Menu extends React.Component<undefined, undefined> {
    public render() {
        const onCachedClick = () => browserHistory.push(routeCached());
        const onRecordingsClick = () => browserHistory.push(routeRecordings());
        return (
            <List>
                <ListItem
                    rightIcon={<MdCached />}
                    caption="Cached"
                    ripple
                    selectable
                    onClick={onCachedClick} />
                <ListItem
                    rightIcon={<MdRecords />}
                    caption="Records"
                    ripple
                    selectable
                    onClick={onRecordingsClick} />
            </List>
        );
    }
}
