import axios from "../../util/axios";
import { Actions } from "../types";

export const getAllBooks = () => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.get('/books')
    .then(({ data }) => {
        dispatch({ 
            type: Actions.BOOK.SET_BOOKS,
            payload: data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({
            type: Actions.BOOK.SET_BOOKS,
            payload: []
        });
    });
};