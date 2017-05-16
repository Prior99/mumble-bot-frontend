import * as React from "react";
import * as style from "./style.scss";
import { grey, barelyWhite } from "../../colors";

const height = 100;
const width = 1000;
const maxLineCount = 20;

export function Visualization({ duration, url }: { duration: number, url: string }) {
    const pixelsPerStep = Math.round((100 / duration)  * 0.5);
    const expectedLines = 100 / pixelsPerStep;
    if (expectedLines < maxLineCount) {
        let gradient = `linear-gradient(to right, ${grey} 0%, transparent 0.1%`;
        for (let i = 0; i <= width; i += pixelsPerStep) {
            gradient = `${gradient}, transparent ${i - 0.1}%, ${grey} ${i}%, transparent ${i + 0.1}%`;
        }
        gradient = `${gradient})`;
        return (
            <div
                className={style.visualization}
                style={{ backgroundImage: `url("${url}"), ${gradient}` }}>
            </div>
        );
    }
    return (
        <div
            className={style.visualization}
            style={{ backgroundImage: `url("${url}")` }}>
        </div>
    );
}
