import * as React from "react";
import { inject, observer } from "mobx-react";
import Dialog from "react-toolbox/lib/dialog";
import Input from "react-toolbox/lib/input";
import * as MdCancel from "react-icons/lib/md/cancel";
import * as MdConfirm from "react-icons/lib/md/check-circle";
import { CachedState } from "../../store";

@inject("cached")
@observer
export class SaveDialog extends React.Component<{ cached?: CachedState }, undefined> {
    public render() {
        const { saving, cancelSave, confirmSave, setSaveName } = this.props.cached;
        const actions = [
            { icon: <MdCancel />, label: "Cancel", onClick: cancelSave },
            { icon: <MdConfirm />, label: "Save", onClick: confirmSave }
        ];
        return (
            <Dialog
                actions={actions}
                active={saving}
                onEscKeyDown={cancelSave}
                onOverlayClick={cancelSave}
                title="Create new Recording"
            >
                <Input
                    type="text"
                    label="Name"
                    onChange={setSaveName}
                />
            </Dialog>
        );
    }
}
