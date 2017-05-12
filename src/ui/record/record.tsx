import * as React from "react";
import { Record } from "../../types";
import * as style from "./style.scss";
import { Card, CardText, CardActions } from "react-toolbox/lib/card";
import * as MdPlay from "react-icons/lib/md/volume-up.js";
import { Button } from "react-toolbox/lib/button";
import { baseUrl } from "../../../config";
import { play } from "../../api";

interface RecordComponentProps {
    record: Record;
}

export class RecordComponent extends React.Component<RecordComponentProps, undefined> {
    public render() {
        const { quote, id } = this.props.record;
        const onPlay = () => play(id);
        return (
            <Card className={style.card}>
                <CardText>
                    {quote}
                </CardText>
                <CardActions>
                    <Button
                        onClick={onPlay}
                        icon={<MdPlay />}
                        label="Play"
                    />
                </CardActions>
            </Card>
        );
    }
}
