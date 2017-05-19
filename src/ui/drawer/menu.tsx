import * as React from "react";
import { browserHistory } from "react-router";
import * as MdRecords from "react-icons/lib/md/mic.js";
import * as MdCached from "react-icons/lib/md/cached.js";
import * as MdQuiet from "react-icons/lib/md/volume-off.js";
import { List, ListItem, ListDivider } from "react-toolbox/lib/list";
import { routeCached, routeRecordings } from "../../routing";
import { shutUp } from "../../api";

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
                <ListDivider />
                <ListItem
                    rightIcon={<MdQuiet />}
                    caption="Shut up"
                    ripple
                    selectable
                    onClick={shutUp} />
            </List>
        );
    }
}
