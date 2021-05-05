import axios from "../../util/axios";
import { Actions } from "../types";


export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: Actions.USER.LOADING_USER });
    axios
        .post('/login', userData)
        .then(({ data }) => {
            const idToken = `Bearer ${data.token}`;
            localStorage.setItem("idToken", idToken);
            axios.defaults.headers.common['Authorization'] = idToken;

            dispatch(getUserData());
            dispatch({ type: Actions.USER.CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            dispatch({ 
                type: Actions.USER.SET_ERRORS,
                payload: err.response.data,
             });
        });
};


export const getUserData = () => (dispatch) => {
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
            type: Actions.USER.SET_ERRORS,
            payload: err.response.data
        });
    });
};