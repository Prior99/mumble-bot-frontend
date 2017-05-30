import * as React from "react";
import { UploadingSound, UploadingState } from "../../types";
import { ListItem } from "react-toolbox/lib/list";
import * as MdUploading from "react-icons/lib/md/autorenew.js";
import * as MdPending from "react-icons/lib/md/schedule.js";
import * as MdDone from "react-icons/lib/md/check.js";
import * as bytes from "bytes";

interface UploadingSoundComponentProps {
    uploadingSound: UploadingSound;
}

function mapStateToIcon(state: UploadingState) {
    if (state === UploadingState.DONE) {
        return <MdDone />;
    }
    if (state === UploadingState.PENDING) {
        return <MdPending />;
    }
    if (state === UploadingState.UPLOADING) {
        return <MdUploading />;
    }
}

export class UploadingSoundComponent extends React.Component<UploadingSoundComponentProps, undefined> {
    public render() {
        const { uploadingSound } = this.props;
        const { file, state } = uploadingSound;
        const { name, size } = file;
        return (
            <ListItem
                caption={name}
                legend={bytes(size)}
                rightIcon={mapStateToIcon(state)}
            />
        );
    }
}

