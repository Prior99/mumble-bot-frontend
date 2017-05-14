import * as React from "react";
import * as style from "./style.scss";
import { Recording } from "../../types";
import { getVisualizationUrl } from "../../utils";
import { grey, barelyWhite } from "../../colors";

const height = 100;
const width = 1000;

export function Visualization({ recording }: { recording: Recording }) {
    const { duration } = recording;
    const pixelsPerStep = Math.round((100 / duration)  * 0.2);
    let gradient = `linear-gradient(to right, ${grey} 0%, transparent 0.1%`;
    for (let i = 0; i <= width; i += pixelsPerStep) {
        gradient = `${gradient}, transparent ${i - 0.1}%, ${grey} ${i}%, transparent ${i + 0.1}%`;
    }
    gradient = `${gradient})`;
    const background1 = `url("${getVisualizationUrl(recording)}")`;
    const background2 = `${gradient}`;
    return (
        <div
            className={style.visualization}
            style={{ backgroundImage: `${background1}, ${background2}` }}>
        </div>
    );
}
