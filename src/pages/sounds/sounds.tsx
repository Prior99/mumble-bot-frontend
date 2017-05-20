import * as React from "react";
import { inject, observer } from "mobx-react";
import { RecordingComponent, Query } from "../../ui";
import { SoundsState } from "../../store";
import { SoundComponent } from "../../ui/sound";
import Infinite = require("react-infinite");

@inject("sounds")
@observer
export class PageSounds extends React.Component<{ sounds?: SoundsState }, undefined> {
    public render() {
        const recordings = this.props.sounds.visibleSounds.map(sound => (
            <SoundComponent sound={sound} key={sound.id} />
        ));
        return (
            <div>
                <h1>Sounds</h1>
                <Query useSounds />
                <Infinite elementHeight={70} useWindowAsScrollContainer>
                    {recordings}
                </Infinite>
            </div>
        );
    }
}
