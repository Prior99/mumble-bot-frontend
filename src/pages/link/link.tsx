import * as React from "react";
import { observer, inject } from "mobx-react";
import * as MdUser from "react-icons/lib/md/face.js";
import * as MdLink from "react-icons/lib/md/link.js";
import { List, ListItem } from "react-toolbox/lib/list";
import { IconButton } from "react-toolbox/lib/button";
import { UsersState } from "../../store";
import { linkUser } from "../../api";

interface LinkProps {
    users?: UsersState;
}

@inject("users")
@observer
export class PageLink extends React.Component<LinkProps, undefined> {
    public render() {
        const { users } = this.props;
        const onLink = async (id: number) => {
            await linkUser(id);
            await users.load();
        };
        const elements = users.freeMumbleUsers.map(user => (
            <ListItem
                key={user.id}
                leftIcon={<MdUser />}
                caption={user.name}
                rightActions={[
                    <IconButton key={0} icon={<MdLink />} onClick={() => onLink(user.id)} />
                ]}
            />
        ));
        return (
            <div>
                <h1>Recordings</h1>
                <List>
                    {elements}
                </List>
            </div>
        );
    }
}

