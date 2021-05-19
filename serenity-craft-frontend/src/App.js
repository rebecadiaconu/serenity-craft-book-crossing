import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import history from "./util/history";
import axios from "./util/axios";

// Redux
import store from './redux/store';
import { getUserData, logOutUser } from './redux/actions/userActions';

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

let token = localStorage.idToken;

console.log(token);

if (token) {
    const decodedToken = token.split(" ")[1];
    const jwtToken = jwtDecode(decodedToken);

    if (jwtToken.exp * 1000 < Date.now()) {
        store.dispatch(logOutUser());
        token = undefined;
    } else {
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData(decodedToken));
    }
} else {
    store.dispatch(logOutUser());
    token = undefined;
}


const App = () => {

    if(!token) history.push("/");

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
