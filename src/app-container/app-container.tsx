import * as React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import { observer, inject } from "mobx-react";
import * as style from "./style.scss";
import { DynamicDrawer, FixedDrawer } from "../ui";
import * as MdMenu from "react-icons/lib/md/menu.js";
import { UiState, LoginState } from "../store";

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
                                leftIcon={<MdMenu />}
                                onLeftIconClick={toggleDrawer}
                                className={style.appBar}
                            />
                            <div className={style.container}>
                                <div>
                                    <FixedDrawer />
                                    <DynamicDrawer />
                                </div>
                                <div className={style.content}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    ) : children
                }
            </div>
        );
    }
}
