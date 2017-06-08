import * as React from "react";
import * as style from "./style.scss";
import { WidgetQueue } from "./widget-queue";
import { WidgetDisconnected } from "./widget-disconnected";

export function Widgets() {
    return (
        <div className={style.widgets}>
            <WidgetDisconnected />
            <WidgetQueue />
        </div>
    );
}
