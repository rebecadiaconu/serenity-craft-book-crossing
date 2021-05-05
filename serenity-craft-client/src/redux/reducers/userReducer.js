import { Actions } from '../types';

const initialState = {
    authenticated: !!localStorage.getItem('idToken'),
    loading: false,
    credentials: {},
    books: [],
    crossings: [],
    requests: [],
    notifications: [],
    errors: {}
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.USER.SET_UNAUTHENTICATED:
            return {
              authenticated: false,
            };
        case Actions.USER.SET_USER:
            return {
              authenticated: true,
              loading: false,
              errors: {},
              ...action.payload,
            };
        case Actions.USER.LOADING_USER:
            return {
              ...state,
              errors: {},
              loading: true,
            };
        case Actions.USER.STOP_LOADING_USER:
            return {
              ...state,
              loading: false,
            };
        case Actions.USER.SET_ERRORS:
            return {
              ...state,
              errors: action.payload,
              loading: false,
            };
        case Actions.USER.CLEAR_ERRORS:
            return {
              ...state,
              errors: {}
            }
        default:
            return state;
    }
};

export default UserReducer;