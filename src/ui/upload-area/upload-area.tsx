import * as React from "react";
import * as MdUpload from "react-icons/lib/md/file-upload.js";
import * as style from "./style.scss";

export interface UploadAreaProps {
    onAddFiles: (files: FileList) => void;
}

export class UploadArea extends React.Component<UploadAreaProps, void> {
    constructor(props: UploadAreaProps) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
    }

    private handleAdd(event: React.SyntheticEvent<HTMLInputElement>) {
        this.props.onAddFiles((event.target as HTMLInputElement).files);
    }

    public render() {
        return (
            <div>
                <div className={style.fileWrapper}>
                    <MdUpload color="rgb(179, 179, 179)" className={style.icon}/>
                    <p className={style.fileWrapperBigText}>Drag files here ...</p>
                    <p className={style.fileWrapperSmallText}>... or click and select.</p>
                    <input
                        type="file"
                        onChange={this.handleAdd}
                        multiple />
                </div>
            </div>
        );
    }
}
