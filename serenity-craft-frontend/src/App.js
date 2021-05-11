import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// Redux
import store from './redux/store';
import { getUserData, logOutUser } from './redux/actions/userActions';

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

let token = localStorage.idToken;

if (token) {
    const decodedToken = token.split(" ")[1];

    console.log(decodedToken);

    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logOutUser());
        token = undefined;
    } else {
        store.dispatch(getUserData(decodedToken));
    }
} else {
    token = undefined;
}


const App = () => {
    const hist = createBrowserHistory();

    return (
        <Router history={hist}>
            <Switch>
                <Route path="/auth" component={AuthLayout} />
                <Route path="/admin" component={AdminLayout} />
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>
        </Router>
    )
}

export default App;
