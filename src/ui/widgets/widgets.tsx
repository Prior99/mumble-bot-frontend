import * as React from "react";
import * as style from "./style.scss";
import { WidgetQueue } from "./widget-queue";

export function Widgets() {
    return (
        <div className={style.widgets}>
            <WidgetQueue />
        </div>
    );
}
