import React, { useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import history from "./util/history";

// Redux
import store from './redux/store';
import axios from "./util/axios";
import { getUserData, logOutUser } from './redux/actions/userActions';

// Components
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

let token = localStorage.idToken;

if (token) {
    const decodedToken = token.split(" ")[1];
    const jwtToken = jwtDecode(decodedToken);

    if (jwtToken.exp * 1000 < Date.now()) {
        store.dispatch(logOutUser());
        token = undefined;
        history.push("/");
    } else {
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData(decodedToken));
    }
} else {
    store.dispatch(logOutUser());
    token = undefined;
}


const App = () => {

    if (!token) history.push("/");

    return (
        <Router history={history}>
            <Switch>
                <Route path="/auth" component={AuthLayout} />
                <Route path="/admin" component={AdminLayout} />
                <Redirect from="/" to="/admin/books" />
            </Switch>
        </Router>
    )
}

export default App;
