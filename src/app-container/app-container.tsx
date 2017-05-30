import * as React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import { observer, inject } from "mobx-react";
import * as style from "./style.scss";
import { DynamicDrawer, FixedDrawer, Widgets } from "../ui";
import * as MdMenu from "react-icons/lib/md/menu.js";
import { UiState, LoginState } from "../store";
import ProgressBar from "react-toolbox/lib/progress_bar";
import Navigation from "react-toolbox/lib/navigation";
import { isLoading } from "../store";

declare var MUMBLE_BOT_VERSION: string;

@inject("ui", "login")
@observer
export class AppContainer extends React.Component<{ ui?: UiState, login?: LoginState }, undefined> {
    public render() {
        const { ui, children, login } = this.props;
        const { toggleDrawer } = ui;
        const { loggedIn } = login;
        return (
            <div>
                {
                    loggedIn ? (
                        <div>
                            <AppBar
                                    theme={{
                                        leftIcon: style.hamburgerMenu
                                    }}
                                    title={`Mumble Bot`}
                                    leftIcon={<MdMenu />}
                                    onLeftIconClick={toggleDrawer}
                                    className={style.appBar}>
                                <Navigation type="horizontal">
                                {
                                    isLoading() &&
                                    <ProgressBar
                                        className={style.progress}
                                        theme={{ circle: style.circle }}
                                        type="circular"
                                        mode="indeterminate" />
                                }
                                </Navigation>
                            </AppBar>
                            <div className={style.container}>
                                <div>
                                    <FixedDrawer />
                                    <DynamicDrawer />
                                </div>
                                <div className={style.content}>
                                    {children}
                                </div>
                                <Widgets />
                            </div>
                        </div>
                    ) : children
                }
                <div className={style.version}>{MUMBLE_BOT_VERSION}</div>
            </div>
        );
    }
}
