import * as React from "react";
import { inject, observer } from "mobx-react";
import Input from "react-toolbox/lib/input";
import * as MdRemoveLabel from "react-icons/lib/md/remove";
import * as MdShuffle from "react-icons/lib/md/shuffle";
import Dropdown from "react-toolbox/lib/dropdown";
import { RecordingsState, UsersState, LabelsState } from "../../store";
import * as style from "./style.scss";
import { LabelComponent } from "../";
import { IconButton } from "react-toolbox/lib/button";
import { play } from "../../api";
import { FilterUser } from "./filter-user";

interface QueryProps {
    recordings?: RecordingsState;
    users?: UsersState;
    labels?: LabelsState;
}

@inject("recordings", "users", "labels")
@observer
export class Query extends React.Component<QueryProps, undefined> {
    public render() {
        const { recordings, users, labels } = this.props;
        const {
            filter,
            query,
            filterLabels,
            filterUsers,
            addFilterUser,
            removeFilterUser,
            addFilterLabel,
            removeFilterLabel,
            getRandomVisible,
            matchingAmount
        } = recordings;
        const { usersDataSource } = users;
        const { labelsSource } = labels;
        const playRandom = () => play(getRandomVisible().id);
        const filterUserElements = filterUsers.map(users.getUser).map(user => (
            <FilterUser id={user.id} onRemoveClick={() => removeFilterUser(user.id)} key={user.id} />
        ));
        const filterLabelElements = filterLabels.map(labels.getLabel).map(label => (
            <LabelComponent
                id={label.id}
                amount
                icon={<MdRemoveLabel />}
                onClick={() => removeFilterLabel(label.id)}
                key={label.id} />
        ));
        const filteredUsersSource = usersDataSource.filter(source => !filterUsers.includes(source.value));
        const filteredLabelsSource = labelsSource.filter(source => !filterLabels.includes(source.value));
        return (
            <div className={style.outer}>
                <div className={style.wrapper}>
                    <Input onChange={filter} value={query} hint="Search" className={style.query} />
                    <Dropdown
                        allowBlank
                        source={filteredUsersSource}
                        onChange={addFilterUser}
                        className={style.dropDown}
                        label="Users"
                    />
                    <Dropdown
                        allowBlank
                        source={filteredLabelsSource}
                        onChange={addFilterLabel}
                        className={style.dropDown}
                        label="Labels"
                    />
                    <IconButton icon={<MdShuffle />} onClick={playRandom} />
                    <div className={style.matching}>
                        {`${matchingAmount} found`}
                    </div>
                </div>
                {
                    filterUsers.length > 0 &&
                        <div className={style.users}>Filtered by Users: {filterUserElements}</div>
                }
                {
                    filterLabels.length > 0 &&
                        <div className={style.users}>Filtered by Labels: {filterLabelElements}</div>
                }
            </div>
        );
    }
}
