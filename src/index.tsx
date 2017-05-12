import * as React from "react";
import * as ReactDOM from "react-dom";
import { inject, observer } from "mobx-react";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import * as Store from "./store";
import { PageLogin, PageApp } from "./pages";
import { LoginState, loginState, recordsState } from "./store";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "./style.scss";

@inject("loginState")
@observer
class App extends React.Component<{ loginState?: LoginState }, undefined> {
    public render() {
        const { loggedIn } = this.props.loginState;
        return (
            <div>
                {
                loggedIn ? <PageApp /> : <PageLogin />
                }
                <DevTools />
            </div>
        );
     }
};


async function main() {
    await loginState.loadStorage();
    await recordsState.loadStorage();
    ReactDOM.render(
        <Provider {...Store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );
}

main();
