import * as React from "react";

import { Route, Redirect, browserHistory } from "react-router";
import { PageLogin, PageRecordings, PageCached } from "../pages";
import { AppContainer } from "../app-container";
import { routeLogin } from "./routes";
import { login } from "../store";

function requireLogin() {
    if (!login.loggedIn) {
        browserHistory.replace(routeLogin());
    }
}

export const rootRoute = (
    <Route component={AppContainer}>
        <Redirect from="/" to="/login" />
        <Route path="login" component={PageLogin} />
        <Route path="recordings" component={PageRecordings} onEnter={requireLogin} />
        <Route path="cached" component={PageCached} onEnter={requireLogin}/>
    </Route>
);
