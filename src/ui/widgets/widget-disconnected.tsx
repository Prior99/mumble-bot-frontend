import * as React from "react";
import * as MdDisconnected from "react-icons/lib/md/sync-problem";
import { observer, inject } from "mobx-react";
import { Card, CardTitle, CardText } from "react-toolbox/lib/card";
import { isDisconnected } from "../../store/utils";

@observer
export class WidgetDisconnected extends React.Component<undefined, undefined> {
    public render() {
        if (!isDisconnected()) {
            return null; // tslint:disable-line
        }
        return (
            <Card>
                <CardTitle style={{ fontSize: "24px" }}><MdDisconnected /> Disconnected</CardTitle>
                <CardText style={{ color: "red" }}>
                    The connection to at least one of the websockets was lost. Attempting to reconnect ...
                </CardText>
            </Card>
        );
    }
}
