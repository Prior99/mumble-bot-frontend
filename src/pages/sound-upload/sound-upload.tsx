import * as React from "react";
import { inject, observer } from "mobx-react";
import { SoundUploadState } from "../../store";
import * as style from "./style.scss";

@inject("soundUpload")
@observer
export class PageSoundUpload extends React.Component<{ soundUpload?: SoundUploadState }, undefined> {
    public render() {
        const { soundUpload } = this.props;
        return (
            <div>
            </div>
        );
    }
}

