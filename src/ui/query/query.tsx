import * as React from "react";
import { inject, observer } from "mobx-react";
import Input from "react-toolbox/lib/input";
import { RecordingsState } from "../../store";

@inject("recordings")
@observer
export class Query extends React.Component<{ recordings?: RecordingsState }, undefined> {
    public render() {
        const { filter, query } = this.props.recordings;
        return (
            <div>
                <Input
                    onChange={filter}
                    value={query}
                    hint="Search"
                />
            </div>
        );
    }
}
