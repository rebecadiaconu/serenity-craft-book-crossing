import axios from "../../util/axios";
import { Actions } from "../types";
import history from "../../util/history";
import { deleteBook } from "redux/actions/bookActions";
import { cancelCrossing } from "./crossingActions";


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
    .then(({ data }) => {
        let canSendReq = data.books.filter((book) => book.available === true).length > 0;
        data.credentials.canSendReq = canSendReq;
        dispatch({
            type: Actions.USER.SET_USER,
            payload: data
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


export const editDetails = (formData) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });

    axios.post('/user', formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getUserData());
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


export const changeImage = (formData) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });

    axios.post('/user/image', formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getUserData());
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

export const removeImage = () => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });

    axios.post('/user/noImage')
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getUserData());
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

export const getAnyUser = (username) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.get(`/user/${username}`)
    .then(({ data }) => {
        dispatch({
            type: Actions.BOOK.SET_ACTUAL,
            payload: 'user'
        });
        dispatch({
            type: Actions.UI.SET_USER,
            payload: data
        });
        dispatch({ 
            type: Actions.BOOK.SET_INIT,
            payload: data.books    
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        console.error(err.response.data);
    });
};

export const deleteAccount = (formData, books, crossings) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });
    books.forEach((book) => dispatch(deleteBook(book.bookId)))
    crossings.forEach((crossing) => dispatch(cancelCrossing(crossing.crossingId)));
    axios.post('/user/delete', formData)
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

export const getNotifications = () => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });
    axios.get('/user/notifications')
    .then(({ data }) => {
        dispatch({
            type: Actions.USER.SET_NOTIF,
            payload: data.notifications
        });
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

export const getRequests = () => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });
    axios.get('/user/requests')
    .then(({ data }) => {
        dispatch({
            type: Actions.USER.SET_REQUESTS,
            payload: data.requests
        });
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

export const markNotificationRead = (notifIds) => (dispatch) => {
    axios.post('/notifications', notifIds)
    .then(({ data }) => {
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};