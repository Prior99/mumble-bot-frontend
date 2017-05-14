import * as React from "react";
import { observer, inject } from "mobx-react";
import * as style from "./style.scss";
import { Drawer } from "react-toolbox/lib/drawer";
import { UiState } from "../../store";

@inject("ui")
@observer
export class DynamicDrawer extends React.Component<{ ui?: UiState }, undefined> {
    public render() {
        const { ui } = this.props;
        const { drawerActive, toggleDrawer } = ui;
        return (
            <Drawer active={drawerActive} onOverlayClick={toggleDrawer}/>
        );
    }
}

