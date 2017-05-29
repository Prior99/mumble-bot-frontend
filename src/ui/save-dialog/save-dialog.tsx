import * as React from "react";
import { inject, observer } from "mobx-react";
import Dialog from "react-toolbox/lib/dialog";
import Input from "react-toolbox/lib/input";
import * as MdCancel from "react-icons/lib/md/cancel";
import * as MdConfirm from "react-icons/lib/md/check-circle";
import * as MdAdd from "react-icons/lib/md/add";
import * as MdRemove from "react-icons/lib/md/remove";
import { CachedState } from "../../store";
import { LabelCloud } from "../";
import * as style from "./style.scss";

@inject("cached")
@observer
export class SaveDialog extends React.Component<{ cached?: CachedState }, undefined> {
    public render() {
        const {
            saving,
            cancelSave,
            confirmSave,
            setSaveName,
            addSaveLabel,
            removeSaveLabel,
            saveState,
            getCachedRecording
        } = this.props.cached;
        if (!saving) {
            return <div />;
        }
        const { name, labels, id } = saveState;
        const cachedRecording = getCachedRecording(id);
        const { duration } = cachedRecording;
        const actions = [
            { icon: <MdCancel />, label: "Cancel", onClick: cancelSave },
            { icon: <MdConfirm />, label: "Save", onClick: confirmSave, disabled: !name }
        ];
        return (
            <Dialog
                    className={style.dialog}
                    actions={actions}
                    active={saving}
                    onEscKeyDown={cancelSave}
                    onOverlayClick={cancelSave}
                    title="Create new Recording">
                <Input
                    type="text"
                    label="Name"
                    value={name}
                    onChange={setSaveName}
                />
                { labels.length > 0 &&
                    <div>
                        <b>Selected Tags</b>
                        <LabelCloud
                            icon={<MdRemove />}
                            mode="selected"
                            selectedLabels={labels}
                            onLabelSelect={removeSaveLabel}/>
                    </div>
                }
                <b>Available Tags</b>
                <LabelCloud
                    icon={<MdAdd />}
                    mode="unselected"
                    onLabelSelect={addSaveLabel}
                    selectedLabels={labels}
                />
            </Dialog>
        );
    }
}
