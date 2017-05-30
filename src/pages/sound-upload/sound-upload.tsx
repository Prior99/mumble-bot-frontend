import * as React from "react";
import { inject, observer } from "mobx-react";
import ProgressBar from "react-toolbox/lib/progress_bar";
import { List } from "react-toolbox/lib/list";
import { SoundUploadState } from "../../store";
import * as style from "./style.scss";
import { UploadArea, UploadingSoundComponent } from "../../ui";

@inject("soundUpload")
@observer
export class PageSoundUpload extends React.Component<{ soundUpload?: SoundUploadState }, undefined> {
    public render() {
        const { soundUpload } = this.props;
        const { addFiles, working, uploading } = soundUpload;
        const elements = uploading.map((file, index) => <UploadingSoundComponent uploadingSound={file} key={index} />);
        return (
            <div>
                <UploadArea onAddFiles={addFiles} />
                <ProgressBar type="linear" mode={working ? "indeterminate" : "determinate"} disabled={!working} />
                <List>
                    {elements}
                </List>
            </div>
        );
    }
}
