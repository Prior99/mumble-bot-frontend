import * as React from "react";
import { inject, observer } from "mobx-react";
import Input from "react-toolbox/lib/input";
import * as MdRemoveUser from "react-icons/lib/md/remove-circle";
import * as MdRemoveLabel from "react-icons/lib/md/remove";
import Dropdown from "react-toolbox/lib/dropdown";
import { RecordingsState, UsersState, LabelsState } from "../../store";
import * as style from "./style.scss";
import { LabelComponent } from "../";

interface FilterUserProps {
    id: number;
    users?: UsersState;
    onRemoveClick: Function;
}

@inject("users")
@observer
export class FilterUser extends React.Component<FilterUserProps, undefined> {
    public render() {
        const { users, id, onRemoveClick } = this.props;
        const user = users.getUser(id);
        return (
            <div className={style.filterUser}>
                <MdRemoveUser className={style.removeButton} onClick={onRemoveClick}/>
                {user.username}
            </div>
        );
    }
}

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
            removeFilterLabel
        } = recordings;
        const { usersDataSource } = users;
        const { labelsSource } = labels;
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
                </div>
                {
                    filterUsers.length > 0 ?
                        <div className={style.users}>Filtered by Users: {filterUserElements}</div> :
                        null
                }
                {
                    filterLabels.length > 0 ?
                        <div className={style.users}>Filtered by Labels: {filterLabelElements}</div> :
                        null
                }
            </div>
        );
    }
}
