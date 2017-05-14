import * as React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import { PageRecordings } from "..";
import * as style from "./style.scss";

export class PageApp extends React.Component<undefined, undefined> {
    public render() {
        return (
            <div>
                <AppBar>
                </AppBar>
                <div className={style.container}>
                    <PageRecordings />
                </div>
            </div>
        );
    }
}
