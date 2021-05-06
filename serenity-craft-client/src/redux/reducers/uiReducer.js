import { Actions } from '../types';

const initialState = {
    sendingEmail: false,
    errors: {},
    message: ''
}

const UiReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.UI.SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        case Actions.UI.CLEAR_ERRORS:
            return {
                ...state,
                errors: {}
            }
        case Actions.UI.SET_ACTION_DONE:
            return {
                ...state,
                errors: {},
                message: action.payload
            }
        case Actions.UI.CLEAR_ACTION:
            return {
                ...state,
                errors: {},
                message: ''
            }
        case Actions.UI.SEND_EMAIL:
            return {
                ...state,
                sendingEmail: true
            }
        case Actions.UI.STOP_SEND_EMAIL:
            return {
                ...state,
                sendingEmail: false
            }
        default:
            return state;
    }
};

export default UiReducer;