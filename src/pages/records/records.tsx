import * as React from "react";
import { inject, observer } from "mobx-react";
import { RecordsState } from "../../store/records";
import { RecordComponent, Query } from "../../ui";
import Infinite = require("react-infinite");

@inject("recordsState")
@observer
export class PageRecords extends React.Component<{ recordsState?: RecordsState }, undefined> {
    public render() {
        const records = this.props.recordsState.visibleRecords.map(record => (
            <RecordComponent record={record} key={record.id} />
        ));
        return (
            <div>
                <Query />
                <Infinite elementHeight={110} useWindowAsScrollContainer>
                    {records}
                </Infinite>
            </div>
        );
    }
}
