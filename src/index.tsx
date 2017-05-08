import * as React from "react";
import * as ReactDOM from "react-dom";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import * as Store from "./store";
import { Login } from "./ui";
import "roboto-fontface/css/roboto/roboto-fontface.css";

class App extends React.Component<undefined, undefined> {
    render() {
        return (
            <div>
                <Login />
                <DevTools />
            </div>
        );
     }
};

ReactDOM.render(
    <Provider {...Store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

async function main() {
}

main();
