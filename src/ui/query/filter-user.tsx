import * as React from "react";
import { inject, observer } from "mobx-react";
import * as MdRemoveUser from "react-icons/lib/md/remove-circle";
import { UsersState } from "../../store";
import * as style from "./style.scss";

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
