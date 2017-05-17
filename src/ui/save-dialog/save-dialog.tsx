import * as React from "react";
import { inject, observer } from "mobx-react";
import Dialog from "react-toolbox/lib/dialog";
import Input from "react-toolbox/lib/input";
import * as MdCancel from "react-icons/lib/md/cancel";
import * as MdConfirm from "react-icons/lib/md/check-circle";
import * as MdAdd from "react-icons/lib/md/add";
import * as MdRemove from "react-icons/lib/md/remove";
import { CachedState } from "../../store";
import { LabelCloud, Visualization } from "../";
import { getCachedVisualizationUrl } from "../../utils";

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
            return null;
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
                    actions={actions}
                    active={saving}
                    onEscKeyDown={cancelSave}
                    onOverlayClick={cancelSave}
                    title="Create new Recording">
                <Visualization url={getCachedVisualizationUrl(cachedRecording)} duration={duration}/ >
                <h3>Name</h3>
                <Input
                    type="text"
                    label="Name"
                    value={name}
                    onChange={setSaveName}
                />
                <h3>Selected Tags</h3>
                <LabelCloud
                    icon={<MdRemove />}
                    mode="selected"
                    selectedLabels={labels}
                    onLabelSelect={removeSaveLabel}/>
                <h3>Available Tags</h3>
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
