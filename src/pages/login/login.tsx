import * as React from "react";
import * as style from "./style.scss";
import { Login } from "../../ui";

export class PageLogin extends React.Component<undefined, undefined> {
    public render() {
        return (
            <div className={style.page}>
                <Login />
            </div>
        );
    }
}
