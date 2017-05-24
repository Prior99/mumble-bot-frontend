import * as React from "react";
import * as ReactDOM from "react-dom";
import { inject, observer } from "mobx-react";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import * as Store from "./store";
import { PageLogin } from "./pages";
import { LoginState, login, recordings, load } from "./store";
import { Shim } from "./ui";
import { Router, browserHistory } from "react-router";
import { rootRoute } from "./routing";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "./style.scss";

@inject("login")
@observer
class App extends React.Component<{ login?: LoginState }, undefined> {
    public render() {
        const { loggedIn } = this.props.login;
        return (
            <div>
                <Router history={browserHistory} routes={rootRoute} />
                <Shim />
                <DevTools />
            </div>
        );
     }
}

async function main() {
    await login.loadStorage();
    if (login.loggedIn) {
        await load();
    }
    ReactDOM.render(
        <Provider {...Store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );
}

main();
