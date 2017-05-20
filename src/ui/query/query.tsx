import * as React from "react";
import { inject, observer } from "mobx-react";
import Input from "react-toolbox/lib/input";
import { RecordingsState, SoundsState } from "../../store";

interface QueryProps {
    recordings?: RecordingsState;
    useSounds?: boolean;
    sounds?: SoundsState;
}

@inject("recordings", "sounds")
@observer
export class Query extends React.Component<QueryProps, undefined> {
    public render() {
        const { recordings, sounds, useSounds } = this.props;
        const { filter: filterRecordings, query: queryRecordings } = recordings;
        const { filter: filterSounds, query: querySounds } = sounds;
        return (
            <div>
                <Input
                    onChange={useSounds ? filterSounds : filterRecordings}
                    value={useSounds ? querySounds : queryRecordings}
                    hint="Search"
                />
            </div>
        );
    }
}
