import axios from "../../util/axios";
import { Actions } from "../types";
import { getBook } from "./bookActions";
import history from "util/history";


export const addReview = (formData, bookId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/book/${bookId}/review`, formData).
    then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getBook(bookId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.REVIEW.STOP_REVIEW });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        history.push(`/admin/books/${bookId}`);
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const getReview = (reviewId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.get(`/reviews/${reviewId}`)
    .then(({ data }) => {
        console.log(data);
        dispatch({ 
            type: Actions.REVIEW.SET_REVIEW,
            payload: data
        });
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

export const editReview = (formData, bookId, reviewId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/book/${bookId}/${reviewId}`, formData).
    then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getBook(bookId));
        dispatch({ type: Actions.REVIEW.STOP_EDIT_REVIEW });
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
 
export const reviewDelete = (bookId, reviewId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.delete(`/book/${bookId}/${reviewId}`)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getBook(bookId));
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