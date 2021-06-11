import axios from "../../util/axios";
import { Actions } from "../types";
import history from "../../util/history";
import { deleteBook } from "redux/actions/bookActions";
import { deleteTopic } from "./crossingActions";
import { deleteReply } from "./crossingActions";
import { reviewDelete } from "./reviewActions";

export const getReports = () => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.get('/reports')
    .then(({ data }) => {
        dispatch({ 
            type: Actions.ADMIN.SET_INIT,
            payload: data.reports 
        });
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({
            type: Actions.ADMIN.SET_INIT,
            payload: []
        });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const rejectReport = (reportId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/reports/${reportId}/reject`)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message 
        });
        dispatch(getReports());
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
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

export const acceptReport = (report, formData) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    if (formData.decision === "delete") {
        switch(report.type) {
            case 'book':
                dispatch(deleteBook(report.book.bookId));
                break
            case 'reply': 
                dispatch(deleteReply(report.topicId, report.reply.replyId));
                break
            case 'topic':
                dispatch(deleteTopic(report.topic.topicId, report.crossingId));
                break
            case 'review':
                dispatch(reviewDelete(report.bookId, report.review.reviewId));
                break
        }
    }
    axios.post(`/reports/${report.reportId}/accept`, formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message 
        });
        dispatch(getReports());
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ type: Actions.ADMIN.STOP_ACCEPT });
    })
    .catch((err) => {
        console.log(err);
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const markSeen = (report) => (dispatch) => {
    dispatch({
        type: Actions.ADMIN.SEE_REPORT,
        payload: report
    });
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/reports/${report.reportId}/seen`)
    .then(({ data }) => {
        dispatch(getReports());
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
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

export const sendEmail = (report) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/reports/${report.reportId}/standBy`)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message 
        });
        dispatch(getReports());
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
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

export const sortReports = (value, reports) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    let newReports = [];
    switch(value) {
        case 0:
            break
        case 1:
            newReports = reports.filter((report) => report.seen === false);
            break
        case 2:
            newReports = reports.filter((report) => report.status === "accepted" && report.seen);
            break
        case 3: 
            newReports = reports.filter((report) => report.status === "rejected" && report.seen);
            break
        case 4:
            newReports = reports.filter((report) => report.status === "stand-by" && report.seen);
            break
        default:
            break;
    }

    dispatch({
        type: Actions.ADMIN.SORT,
        payload: value
    });
    if (value === 0) dispatch({ type: Actions.ADMIN.STOP_SEARCH });
    else dispatch({
        type: Actions.ADMIN.SET_REPORTS,
        payload: newReports
    });
    dispatch({ type: Actions.UI.STOP_LOADING_DATA });
};

export const setSearchValue = (data, reports) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });

    if(!!data) {
        let newReports = reports.filter((report) => {
            return (report.sender.toLowerCase().includes(data.toLowerCase()) || report.recipient.toLowerCase().includes(data.toLowerCase()));
        });

        dispatch({
            type: Actions.ADMIN.SET_REPORTS,
            payload: newReports
        }); 
        dispatch({
            type: Actions.ADMIN.SET_SEARCH_DATA,
            payload: data
        });
    }
    else dispatch({ type: Actions.ADMIN.STOP_SEARCH });
    dispatch({ type: Actions.UI.STOP_LOADING_DATA });
};