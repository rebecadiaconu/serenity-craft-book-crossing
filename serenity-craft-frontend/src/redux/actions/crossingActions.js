import axios from "../../util/axios";
import { Actions } from "../types";
import { getBook } from "redux/actions/bookActions";
import { getUserData } from "redux/actions/userActions";
import history from "util/history";
import { getRequests } from "./userActions";


export const getCrossingData = (crossingId) => (dispatch) => {
    console.log('here!!');
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.get(`/crossings/${crossingId}`)
    .then(({ data }) => {
        dispatch({
            type: Actions.CROSSING.SET_CROSSING,
            payload: data
        });
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        console.error(err);
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
    });
};


export const chooseRandomBook = (sender, recipient) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/random/${sender}/${recipient}`)
    .then(({ data }) => {
        dispatch({
            type: Actions.CROSSING.SET_RANDOM_BOOK,
            payload: data
        });
        dispatch({ type: Actions.CROSSING.SEND_REQ });
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        console.error(err);
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
    });
};


export const sendRequest = (bookId, formData) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/crossing/${bookId}`, formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getUserData());
        dispatch(getBook(bookId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.CROSSING.STOP_SEND_REQ });
        dispatch({ type: Actions.CROSSING.STOP_SET_RANDOM_BOOK });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        console.error(err);
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
    });
};


export const deleteCrossing = (crossingId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.delete(`/crossings/${crossingId}`)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};


export const changeCrossingStatus = (formData, crossingId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/crossing/${crossingId}/status`, formData)
    .then(({ data }) => {
        dispatch(getCrossingData(crossingId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const changeCrossingBook = (crossingId, bookId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/crossings/${crossingId}/${bookId}`)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getCrossingData(crossingId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const changeCrossingType = (crossingId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/crossing/${crossingId}/permanent`)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getCrossingData(crossingId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const acceptCrossing = (crossingId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/crossing/${crossingId}/accept`)
    .then(({ data }) => {
        dispatch({
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        })
        dispatch(getRequests());     
        dispatch(getCrossingData(crossingId));   
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        history.push(`/admin/crossings/${crossingId}`);
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const rejectCrossing = (crossingId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/crossing/${crossingId}/reject`)
    .then(({ data }) => {
        dispatch(getRequests());        
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const cancelCrossing = (crossingId, bookId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/crossing/${crossingId}/cancel`)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        if (bookId) dispatch(getBook(bookId));
        else dispatch(getCrossingData(crossingId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};  

export const markRequestsRead = (crossingId) => (dispatch) => {
    axios.post(`/request/${crossingId}`)
    .then(({ data }) => {
        dispatch(getRequests());
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const getTopic = (topicId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    console.log('xfdcghjk');
    axios.get(`/topics/${topicId}`).
    then(({ data }) => {
        dispatch({
            type: Actions.CROSSING.VIEW_TOPIC,
            payload: data
        });
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const addTopic = (formData, crossingId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/crossing/${crossingId}/topic`, formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch({ type: Actions.CROSSING.STOP_ADD_TOPIC });
        dispatch(getCrossingData(crossingId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};  

export const editTopic = (formData, crossingId, topicId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/topics/${topicId}`, formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch({ type: Actions.CROSSING.STOP_EDIT_TOPIC });
        dispatch(getCrossingData(crossingId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const deleteTopic = (topicId, crossingId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.delete(`/topics/${topicId}`)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getCrossingData(crossingId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.CROSSING.STOP_DELETE_TOPIC });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const addReply = (formData, topicId) => (dispatch) => {
    console.log(formData, topicId);
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/topics/${topicId}/reply`, formData)
    .then(({ data }) => {
        console.log(data);
        dispatch({
            type: Actions.CROSSING.ADD_REPLY,
            payload: data
        });
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        console.log(err);
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    }); 
}


export const deleteReply = (topicId, replyId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.delete(`/topics/${topicId}/${replyId}`)
    .then(({ data }) => {
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};