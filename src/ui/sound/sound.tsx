import * as React from "react";
import { Sound } from "../../types";
import * as style from "./style.scss";
import { Card, CardText, CardActions } from "react-toolbox/lib/card";
import * as MdPlay from "react-icons/lib/md/volume-up.js";
import { Button } from "react-toolbox/lib/button";
import { playSound } from "../../api";
import * as moment from "moment";

interface SoundComponentProps {
    sound: Sound;
}

export class SoundComponent extends React.Component<SoundComponentProps, undefined> {
    public render() {
        const { sound } = this.props;
        const { name, id } = sound;
        const onPlay = () => playSound(id);
        return (
            <Card className={style.card}>
                <div className={style.container}>
                    <div className={style.leftContent}>
                        <div className={style.name}>{name}</div>
                    </div>
                    <div className={style.rightContent}>
                        <Button
                            onClick={onPlay}
                            icon={<MdPlay />}
                            label="Play"
                        />
                    </div>
                </div>
            </Card>
        );
    }
}
