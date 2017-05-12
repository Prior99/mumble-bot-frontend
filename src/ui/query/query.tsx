import * as React from "react";
import { inject, observer } from "mobx-react";
import Input from "react-toolbox/lib/input";
import { RecordsState } from "../../store";

@inject("recordsState")
@observer
export class Query extends React.Component<{ recordsState?: RecordsState }, undefined> {
    public render() {
        const { filter, query } = this.props.recordsState;
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
