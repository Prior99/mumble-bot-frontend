import * as React from "react";
import { inject, observer } from "mobx-react";
import { CachedState } from "../../store";
import { CachedComponent } from "../../ui/cached/cached";

interface CachedProps {
    cached?: CachedState;
}

@inject("cached")
@observer
export class PageCached extends React.Component<CachedProps, undefined> {
    public render() {
        const cachedRecordings = this.props.cached.sorted.map(cached => (
            <CachedComponent cached={cached} key={cached.id} />
        ));
        return (
            <div>
                <h1>Cached Recordings</h1>
                {cachedRecordings}
            </div>
        );
    }
}
