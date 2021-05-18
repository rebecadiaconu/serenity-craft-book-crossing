import React from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';

// Redux
import store from './redux/store';
import { getUserData, logOutUser } from './redux/actions/userActions';

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

let token = localStorage.idToken;

if (token) {
    const decodedToken = token.split(" ")[1];
    const jwtToken = jwtDecode(decodedToken);

    if (jwtToken.exp * 1000 < Date.now()) {
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

    if(!token) hist.push("/");

    return (
        <Router history={hist}>
            <Switch>
                <Route path="/auth" component={AuthLayout} />
                <Route path="/admin" component={AdminLayout} />
                <Redirect from="/" to="/admin/books" />
            </Switch>
        </Router>
    )
}

export default App;
