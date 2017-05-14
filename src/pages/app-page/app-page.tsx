import * as React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import { observer, inject } from "mobx-react";
import { PageRecordings } from "..";
import * as style from "./style.scss";
import { DynamicDrawer, FixedDrawer } from "../../ui";
import * as MdMenu from "react-icons/lib/md/menu.js";
import { UiState } from "../../store";

@inject("ui")
@observer
export class PageApp extends React.Component<{ ui?: UiState }, undefined> {
    public render() {
        const { ui } = this.props;
        const { toggleDrawer } = ui;
        return (
            <div>
                <AppBar
                    theme={{
                        leftIcon: style.hamburgerMenu
                    }}
                    leftIcon={<MdMenu />}
                    onLeftIconClick={toggleDrawer}
                    className={style.appBar}
                />
                <div className={style.container}>
                    <FixedDrawer />
                    <DynamicDrawer />
                    <div className={style.content}>
                        <PageRecordings />
                    </div>
                </div>
            </div>
        );
    }
}
