import * as React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import { PageRecordings } from "..";
import * as style from "./style.scss";
import { Drawer } from "../../ui";

export class PageApp extends React.Component<undefined, undefined> {
    public render() {
        return (
            <div>
                <AppBar className={style.appBar}/>
                <div className={style.container}>
                    <Drawer />
                    <div className={style.content}>
                        <PageRecordings />
                    </div>
                </div>
            </div>
        );
    }
}
