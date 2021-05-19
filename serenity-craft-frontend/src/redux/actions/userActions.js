import axios from "../../util/axios";
import { Actions } from "../types";
import history from "../../util/history";


export const setAuth = (token) => {
    const idToken = `Bearer ${token}`;
    localStorage.setItem("idToken", idToken);
    axios.defaults.headers.common['Authorization'] = idToken;
};


export const signUp = (userData) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });
    axios
        .post('/signup', userData)
        .then(({ data }) => {
            setAuth(data.token);
            dispatch({ type: Actions.UI.CLEAR_ERRORS });
            dispatch({ type: Actions.USER.STOP_LOADING_USER });
            dispatch(getUserData());
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

 
export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });
    axios
        .post('/login', userData)
        .then(({ data }) => {
            setAuth(data.token);
            dispatch({ type: Actions.UI.CLEAR_ERRORS });
            dispatch(getUserData());
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


export const logOutUser = () => (dispatch) => {
    dispatch({ type: Actions.USER.SET_UNAUTHENTICATED });
    localStorage.removeItem('idToken');
    delete axios.defaults.headers.common['Authorization'];
    history.push('/auth/login-page');
}


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


export const getUserData = () => (dispatch) => {
    axios
    .get('/user')
    .then((result) => {
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

export const changeEmail = (formData) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });

    axios.post('/user/email', formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(logOutUser());
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.USER.STOP_LOADING_USER });
    })
    .catch((err) => {
        dispatch({ type: Actions.USER.STOP_LOADING_USER });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};


export const changeUsername = (formData) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });

    axios.post('/user/username', formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(logOutUser());
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.USER.STOP_LOADING_USER });
    })
    .catch((err) => {
        dispatch({ type: Actions.USER.STOP_LOADING_USER });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};


export const changePassword = (formData) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });
    
    axios.post('/user/password', formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(logOutUser());
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.USER.STOP_LOADING_USER });
    })
    .catch((err) => {
        dispatch({ type: Actions.USER.STOP_LOADING_USER });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};