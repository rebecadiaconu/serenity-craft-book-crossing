import { Actions } from '../types';

const initialState = {
    backUp: false,
    scrolling: false,
    loading: false,
    sendingEmail: false,
    errors: null,
    message: '',
    user: {},
    userBooks: []
}

const UiReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.UI.LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case Actions.UI.STOP_LOADING_DATA:
            return {
                ...state,
                loading: false
            };
        case Actions.UI.SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        case Actions.UI.CLEAR_ERRORS:
            console.log('CLEAR ERRORS!');
            return {
                ...state,
                errors: null
            }
        case Actions.UI.SET_ACTION_DONE:
            return {
                ...state,
                errors: null,
                message: action.payload,
            }
        case Actions.UI.CLEAR_ACTION:
            return {
                ...state,
                errors: null,
                message: ''
            }
        case Actions.UI.SEND_EMAIL:
            return {
                ...state,
                sendingEmail: true,
            }
        case Actions.UI.STOP_SEND_EMAIL:
            return {
                ...state,
                sendingEmail: false
            }
        case Actions.UI.SCROLLING:
            return {
                ...state,
                backUp: false,
                scrolling: true
            }
        case Actions.UI.STOP_SCROLLING:
            return {
                ...state,
                backUp: false,
                scrolling: false
            }
        case Actions.UI.BACK_UP:
            return {
                ...state,
                backUp: true,
                scrolling: false
            }  
        case Actions.UI.SET_USER: 
            return {
                ...state,
                user: action.payload.user,
                userBooks: action.payload.books,
            }
        case Actions.UI.REMOVE_USER: 
            return {
                ...state,
                user: {},
                userBooks: [],
            }
        default:
            return state;
    }
};

export default UiReducer;