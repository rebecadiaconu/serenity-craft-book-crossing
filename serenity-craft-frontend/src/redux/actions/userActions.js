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
    dispatch({ type: Actions.UI.LOADING_BUTTON });
    axios
        .post('/signup', userData)
        .then(({ data }) => {
            setAuth(data.token);
            dispatch({ type: Actions.UI.STOP_LOADING_DATA });
            dispatch(getUserData());
            dispatch({ type: Actions.UI.CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch({
                type: Actions.UI.STOP_LOADING_DATA
            });
            dispatch({ 
                type: Actions.UI.SET_ERRORS,
                payload: err.response.data,
             });
        });
};

 
export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_BUTTON });
    axios
        .post('/login', userData)
        .then(({ data }) => {
            setAuth(data.token);
            dispatch({ type: Actions.UI.STOP_LOADING_DATA });
            dispatch(getUserData());
            dispatch({ type: Actions.UI.CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch({
                type: Actions.UI.STOP_LOADING_DATA
            });
            dispatch({ 
                type: Actions.UI.SET_ERRORS,
                payload: err.response.data,
             });
        });
};


export const logOutUser = () => (dispatch) => {
    localStorage.removeItem('idToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: Actions.UI.STOP_SETTINGS });
    dispatch({ type: Actions.UI.CLEAR_ACTION });
    dispatch({ type: Actions.USER.SET_UNAUTHENTICATED });
    history.push('/auth/login-page');
}


export const forgotPassword = (userData) => (dispatch) => {
    // dispatch({ type: Actions.UI.LOADING_BUTTON });
    dispatch({ type: Actions.UI.SEND_EMAIL });
    axios.post('/forgotPassword', userData)
    .then(({ data }) => {
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        // dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ type: Actions.UI.STOP_SEND_EMAIL });
    })
    .catch((err) => {
        // dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ type: Actions.UI.STOP_SEND_EMAIL });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data,
         });
    });
};


export const getUserData = () => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });
    axios
    .get('/user')
    .then(({ data }) => {
        let canSendReq = data.books.filter((book) => book.available === true).length > 0;
        data.credentials.canSendReq = canSendReq;
        if (data.credentials.role === "admin") {
            dispatch({ type: Actions.ADMIN.SET_ADMIN });
            history.push("/serenity-admin");
        } 
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({
            type: Actions.USER.SET_USER,
            payload: data
        });
        dispatch({ type: Actions.USER.STOP_LOADING_USER });
    })
    .catch((err) => {
        dispatch({
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
        dispatch({ type: Actions.USER.STOP_LOADING_USER });
    });
};

export const getUserFavs = (bookIds, books) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });

    let favBooks = [];
    favBooks = books.filter((book) => bookIds.includes(book.bookId));

    dispatch({
        type: Actions.USER.SET_FAVS,
        payload: favBooks
    });
    dispatch({ type: Actions.UI.STOP_LOADING_DATA });
};

export const addToFavs = (bookId) => (dispatch) => {
    // dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/user/favs/${bookId}`)
    .then(({ data }) => {
        dispatch(getUserData());
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        // dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
        // dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const removeFromFavs = (bookId) => (dispatch) => {
    // dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/user/noFavs/${bookId}`)
    .then(({ data }) => {
        dispatch(getUserData());
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        // dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
        // dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const changeEmail = (formData) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_BUTTON });
    dispatch({ type: Actions.UI.SETTINGS });

    axios.post('/user/email', formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        // dispatch(logOutUser());
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};


export const changeUsername = (formData) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_BUTTON });
    dispatch({ type: Actions.UI.SETTINGS });

    axios.post('/user/username', formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        // dispatch(logOutUser());
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};


export const changePassword = (formData) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_BUTTON });
    dispatch({ type: Actions.UI.SETTINGS });

    axios.post('/user/password', formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        // dispatch(logOutUser());
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};


export const editDetails = (formData) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_BUTTON });

    axios.post('/user', formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch(getUserData());
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};


export const changeImage = (formData) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_BUTTON });

    axios.post('/user/image', formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch(getUserData());
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const removeImage = () => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_BUTTON });

    axios.post('/user/noImage')
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch(getUserData());
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const getAnyUser = (username, load) => (dispatch) => {
    if (load) dispatch({ type: Actions.UI.LOADING_DATA });
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
    dispatch({ type: Actions.UI.LOADING_BUTTON });
    dispatch({ type: Actions.UI.SETTINGS });

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
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const getNotifications = () => (dispatch) => {
    // dispatch({ type: Actions.USER.LOADING_USER });
    axios.get('/user/notifications')
    .then(({ data }) => {
        dispatch({
            type: Actions.USER.SET_NOTIF,
            payload: data.notifications
        });
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        // dispatch({ type: Actions.USER.STOP_LOADING_USER });
    })
    .catch((err) => {
        console.log(err);
        // dispatch({ type: Actions.USER.STOP_LOADING_USER });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const getRequests = () => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.get('/user/requests')
    .then(({ data }) => {
        dispatch({
            type: Actions.USER.SET_REQUESTS,
            payload: data.requests
        });
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
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


export const addReport = (formData, username) => (dispatch) => {
    // dispatch({ type: Actions.UI.LOADING_DATA });
    dispatch({ type: Actions.UI.LOADING_BUTTON });
    axios.post(`/report/${username}`, formData)
    .then(({ data }) => {
        dispatch({
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch({ type: Actions.UI.STOP_REPORT });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};


export const sortCrossings = (value, crossings) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    let newCrossings = [];
    switch(value) {
        case 0:
            break
        case 1:
            newCrossings = crossings.filter((crossing) => crossing.status === "pending" && !crossing.canceled);
            break
        case 2:
            newCrossings = crossings.filter((crossing) => crossing.status !== "pending" && crossing.status !== "done" && !crossing.canceled);
            break
        case 3: 
            newCrossings = crossings.filter((crossing) => crossing.status === "done" && !crossing.canceled);
            break
        case 4:
            newCrossings = crossings.filter((crossing) => crossing.canceled);
            break
        default:
            break;
    }

    dispatch({
        type: Actions.USER.SORT,
        payload: value
    });
    if (value === 0) dispatch({ type: Actions.USER.STOP_SEARCH });
    else dispatch({
        type: Actions.USER.SET_CROSSINGS,
        payload: newCrossings
    });
    dispatch({ type: Actions.UI.STOP_LOADING_DATA });
};

export const setSearchValue = (data, crossings) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });

    if(!!data) {
        let newCrossings = crossings.filter((crossing) => {
            return (crossing.reqBook.title.toLowerCase().includes(data.toLowerCase()) || crossing.reqBook.author.toLowerCase().includes(data.toLowerCase()) || crossing.randomBook.title.toLowerCase().includes(data.toLowerCase()) || crossing.randomBook.author.toLowerCase().includes(data.toLowerCase()) || crossing.sender.toLowerCase().includes(data.toLowerCase()) || crossing.recipient.toLowerCase().includes(data.toLowerCase()));
        });

        dispatch({
            type: Actions.USER.SET_CROSSINGS,
            payload: newCrossings
        }); 
        dispatch({
            type: Actions.USER.SET_SEARCH_DATA,
            payload: data
        });
    }
    else dispatch({ type: Actions.USER.STOP_SEARCH });
    dispatch({ type: Actions.UI.STOP_LOADING_DATA });
};