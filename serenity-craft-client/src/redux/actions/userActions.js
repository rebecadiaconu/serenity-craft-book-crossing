import axios from "../../util/axios";
import { Actions } from "../types";


export const setAuth = (token) => {
    const idToken = `Bearer ${token}`;
    localStorage.setItem("idToken", idToken);
    axios.defaults.headers.common['Authorization'] = idToken;
};


export const signUp = (userData, history) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });
    axios
        .post('/signup', userData)
        .then(({ data }) => {
            dispatch(getUserData(data.token));
            dispatch({ type: Actions.UI.CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: Actions.USER.STOP_LOADING_USER
            });
            dispatch({ 
                type: Actions.UI.SET_ERRORS,
                payload: err.response.data,
             });
        });
};

 
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });
    axios
        .post('/login', userData)
        .then(({ data }) => {
            dispatch(getUserData(data.token));
            dispatch({ type: Actions.UI.CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: Actions.USER.STOP_LOADING_USER
            });
            dispatch({ 
                type: Actions.UI.SET_ERRORS,
                payload: err.response.data,
             });
        });
};


export const forgotPassword = (userData) => (dispatch) => {
    dispatch({ type: Actions.UI.SEND_EMAIL });
    axios.post('/forgotPassword', userData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch({ type: Actions.UI.STOP_SEND_EMAIL });
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_SEND_EMAIL });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data,
         });
    });
};


export const getUserData = (token) => (dispatch) => {
    setAuth(token);

    axios
    .get('/user')
    .then((result) => {
        console.log(result);
        dispatch({
            type: Actions.USER.SET_USER,
            payload: result.data
        });
    })
    .catch((err) => {
        dispatch({
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};