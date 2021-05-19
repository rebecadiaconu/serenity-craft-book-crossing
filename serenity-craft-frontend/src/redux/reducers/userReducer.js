import { Actions } from '../types';

const initialState = {
    authenticated: !!localStorage.getItem('idToken'),
    loading: false,
    credentials: {},
    books: [],
    crossings: [],
    requests: [],
    notifications: []
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.USER.SET_UNAUTHENTICATED:
            return initialState;
        case Actions.USER.SET_USER:
            return {
              authenticated: true,
              loading: false,
              ...action.payload,
            };
        case Actions.USER.LOADING_USER:
            return {
              loading: true,
              ...state
            };
        case Actions.USER.STOP_LOADING_USER:
            return {
              loading: false,
              ...state
            };
        case Actions.USER.CHANGE_EMAIL:
          return {
            ...state,
            loading: false
          };
        case Actions.USER.CHANGE_USERNAME:
          return {
            ...state,
            loading: false
          };
        case Actions.USER.CHANGE_PASSWORD:
          return {
            ...state,
            loading: false
          }
        default:
            return state;
    }
};

export default UserReducer;