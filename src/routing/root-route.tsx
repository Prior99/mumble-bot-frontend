import * as React from "react";

import { Route, Redirect } from "react-router";
import { PageLogin, PageRecordings } from "../pages";
import { AppContainer } from "../app-container";

export const rootRoute = (
    <Route component={AppContainer}>
        <Redirect from="/" to="/login" />
        <Route path="login" component={PageLogin} />
        <Route path="recordings" component={PageRecordings} />
    </Route>
);
