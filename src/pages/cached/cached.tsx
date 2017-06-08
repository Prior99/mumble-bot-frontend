import * as React from "react";
import { inject, observer } from "mobx-react";
import { CachedState } from "../../store";
import { CachedComponent } from "../../ui/cached/cached";
import { SaveDialog } from "../../ui";
import * as MdPaused from "react-icons/lib/md/pause";
import * as style from "./style.scss";

interface CachedProps {
    cached?: CachedState;
}

@inject("cached")
@observer
export class PageCached extends React.Component<CachedProps, undefined> {
    public render() {
        const { sorted, paused, pause, unpause } = this.props.cached;
        const cachedRecordings = sorted.map(cached => (
            <CachedComponent cachedRecording={cached} key={cached.id} />
        ));
        return (
            <div onMouseEnter={pause} onMouseLeave={unpause}>
                {
                    paused &&
                    <div className={style.pausedIndicator}>
                        <MdPaused style={{ verticalAlign: "top" }} /> Paused
                    </div>
                }
                <div className={paused && style.paused}>
                    {cachedRecordings}
                    <SaveDialog />
                </div>
            </div>
        );
    }
}
