import * as React from "react";
import { Input } from "react-toolbox/lib/input";
import { Checkbox } from "react-toolbox/lib/checkbox";
import { Button } from "react-toolbox/lib/button";
import { inject, observer } from "mobx-react";
import { LoginState } from "../../store";
import { Card, CardTitle, CardText, CardActions } from "react-toolbox/lib/card";
import * as style from "./style.scss";

@inject("login")
@observer
export class Login extends React.Component<{ login?: LoginState }, undefined> {
    public render() {
        const {
            updateUsername,
            updatePassword,
            updateRememberMe,
            login,
            rememberMe,
            username,
            password,
            failed
        } = this.props.login;
        return (
            <Card className={style.card}>
                <CardTitle>Login</CardTitle>
                <CardText>
                    <Input
                        onChange={updateUsername}
                        error={failed && "Wrong username or password."}
                        hint="Username"
                        value={username}
                    />
                    <Input
                        onChange={updatePassword}
                        error={failed && "Wrong username or password."}
                        hint="Password"
                        type="password"
                        value={password}
                    />
                    <Checkbox
                        checked={rememberMe}
                        onChange={updateRememberMe}
                        label="Remember Me."
                    />
                </CardText>
                <CardActions>
                    <Button onClick={login}>Login</Button>
                </CardActions>
            </Card>
        );
    }
}
