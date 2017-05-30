import * as React from "react";
import { browserHistory } from "react-router";
import * as MdRecords from "react-icons/lib/md/mic.js";
import * as MdCached from "react-icons/lib/md/cached.js";
import * as MdQuiet from "react-icons/lib/md/volume-off.js";
import * as MdSounds from "react-icons/lib/md/play-arrow.js";
import * as MdLink from "react-icons/lib/md/link.js";
import * as MdUpload from "react-icons/lib/md/file-upload.js";
import { List, ListItem, ListDivider } from "react-toolbox/lib/list";
import { routeCached, routeRecordings, routeSounds, routeLink, routeUploadSound } from "../../routing";
import { shutUp } from "../../api";

export class Menu extends React.Component<undefined, undefined> {
    public render() {
        const onCachedClick = () => browserHistory.push(routeCached());
        const onRecordingsClick = () => browserHistory.push(routeRecordings());
        const onSoundsClick = () => browserHistory.push(routeSounds());
        const onLinkClick = () => browserHistory.push(routeLink());
        const onUploadSoundClick = () => browserHistory.push(routeUploadSound());
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
                    caption="Recordings"
                    ripple
                    selectable
                    onClick={onRecordingsClick} />
                <ListItem
                    rightIcon={<MdSounds />}
                    caption="Sounds"
                    ripple
                    selectable
                    onClick={onSoundsClick} />
                <ListDivider />
                <ListItem
                    rightIcon={<MdUpload />}
                    caption="Upload Sound"
                    ripple
                    selectable
                    onClick={onUploadSoundClick} />
                <ListItem
                    rightIcon={<MdQuiet />}
                    caption="Shut up"
                    ripple
                    selectable
                    onClick={shutUp} />
                <ListDivider />
                <ListItem
                    rightIcon={<MdLink />}
                    caption="Link to User"
                    ripple
                    selectable
                    onClick={onLinkClick} />
            </List>
        );
    }
}
