import axios from "../../util/axios";
import { Actions } from "../types";
import history from "util/history";


export const getCrossingData = (crossingId) => (dispatch) => {
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

export const cancelCrossing = (crossingId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/crossing/${crossingId}/cancel`)
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

export const addTopic = (formData, crossingId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/crossing/${crossingId}/topic`, formData)
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

export const editTopic = (formData, crossingId, topicId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/topics/${topicId}`, formData)
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
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/topics/${topicId}/reply`, formData)
    .then(({ data }) => {
        dispatch({
            type: Actions.CROSSING.ADD_REPLY,
            payload: data
        })
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