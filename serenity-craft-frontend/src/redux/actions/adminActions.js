import axios from "../../util/axios";
import { Actions } from "../types";
import history from "../../util/history";
import { deleteBook } from "redux/actions/bookActions";
import { cancelCrossing } from "./crossingActions";
import { deleteTopic } from "./crossingActions";
import { deleteReply } from "./crossingActions";
import { deleteReview } from "./bookActions";

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
    });
};

export const acceptReport = () => (dispatch) => {

};