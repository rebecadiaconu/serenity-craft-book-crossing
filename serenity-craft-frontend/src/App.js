import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import history from "./util/history";

// Redux
import { useSelector, useDispatch } from "react-redux";
import store from './redux/store';
import axios from "./util/axios";
import { getUserData, logOutUser } from './redux/actions/userActions';

// Components
import UserPage from "pages/User/UserPage";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import { Actions } from 'redux/types';

let token = localStorage.idToken;

if (token) {
    const decodedToken = token.split(" ")[1];
    const jwtToken = jwtDecode(decodedToken);

    if (jwtToken.exp * 1000 < Date.now()) {
        token = undefined;
        store.dispatch(logOutUser());
    } else {
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData(decodedToken));
    }
} else {
    store.dispatch(logOutUser());
    token = undefined;
}


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let token = localStorage.idToken;
        if (!token) {
          history.push("/");  
          dispatch({ type: Actions.USER.SET_UNAUTHENTICATED });
        } 
    }, []);

    // useEffect(() => {
    //     if (!authenticated) dispatch(logOutUser());
    // }, [authenticated]);

    return (
        <Router history={history}>
            <Switch>
                {/* <Route path="/admin/users/:username" component={UserPage} /> */}
                <Route path="/auth" component={AuthLayout} />
                <Route path="/admin" component={AdminLayout} />
                <Redirect from="/" to="/admin/all-books" />
            </Switch>
        </Router>
    )
}

export default App;
