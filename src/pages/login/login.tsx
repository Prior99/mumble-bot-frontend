import * as React from "react";
import { observer, inject } from "mobx-react";
import * as style from "./style.scss";
import { Login } from "../../ui";
import { LoginState } from "../../store";
import { routeRecordings } from "../../routing";
import { browserHistory } from "react-router";

interface LoginProps {
    login?: LoginState;
}

@inject("login")
@observer
export class PageLogin extends React.Component<LoginProps, undefined> {
    constructor(props: LoginProps) {
        super(props);

        if (props.login.loggedIn) {
            browserHistory.replace(routeRecordings());
        }
    }
    public render() {
        return (
            <div className={style.page}>
                <Login />
            </div>
        );
    }
}
