import * as React from "react";
import { inject, observer } from "mobx-react";
import Input from "react-toolbox/lib/input";
import { RecordingComponent, Query } from "../../ui";
import { SoundsState } from "../../store";
import { SoundComponent } from "../../ui/sound";
import Infinite = require("react-infinite"); // tslint:disable-line

@inject("sounds")
@observer
export class PageSounds extends React.Component<{ sounds?: SoundsState }, undefined> {
    public render() {
        const { sounds } = this.props;
        const { filter, query } = sounds;
        const elements = this.props.sounds.visibleSounds.map(sound => (
            <SoundComponent sound={sound} key={sound.id} />
        ));
        return (
            <div>
                <h1>Sounds</h1>
                <Input onChange={filter} value={query} hint="Search" />
                <Infinite elementHeight={70} useWindowAsScrollContainer>
                    {elements}
                </Infinite>
            </div>
        );
    }
}
