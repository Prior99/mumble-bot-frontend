import * as React from "react";
import { Input } from "react-toolbox/lib/input";
import { Button } from "react-toolbox/lib/button";
import { inject, observer } from "mobx-react";
import { LoginState } from "../store";

@inject("loginState")
@observer
export class Login extends React.Component<{ loginState?: LoginState }, undefined> {
    public render() {
        const { updateUsername, updatePassword, login } = this.props.loginState;
        return (
            <div>
                <Input onChange={updateUsername} />
                <Input onChange={updatePassword} type="password" />
                <Button onClick={login}>Login</Button>
            </div>
        );
    }
}
