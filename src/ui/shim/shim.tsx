import * as React from "react";
import ProgressBar from "react-toolbox/lib/progress_bar";
import { observer, inject } from "mobx-react";
import * as style from "./style.scss";
import { RecordingsState, UsersState, isLoading } from "../../store";

interface ShimProps {
    users?: UsersState;
    recordings?: RecordingsState;
}

@inject("users", "recordings")
@observer
export class Shim extends React.Component<ShimProps, undefined> {
    render() {
        const { users, recordings } = this.props;
        if (!isLoading(users, recordings)) {
            return <div />;
        }
        return (
            <div className={style.shim}>
                <div className={style.content}>
                    <p>Loading...</p>
                    <ProgressBar mode="indeterminate" />
                </div>
            </div>
        );
    }
}
