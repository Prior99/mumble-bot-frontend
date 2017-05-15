import * as React from "react";
import * as style from "./style.scss";
import { Card } from "react-toolbox/lib/card";
import { Menu } from "./menu";

export function FixedDrawer() {
    return (
        <Card className={style.drawer}>
            <Menu />
        </Card>
    );
}
