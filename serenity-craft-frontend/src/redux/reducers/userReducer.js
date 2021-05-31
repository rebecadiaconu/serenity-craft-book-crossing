import { Actions } from '../types';

const initialState = {
    authenticated: !!localStorage.getItem('idToken'),
    loading: false,
    deleted: false,
    credentials: {},
    books: [],
    crossings: [],
    requests: [],
    notifications: []
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.USER.SET_UNAUTHENTICATED:
            return {
              ...initialState,
              authenticated: !!localStorage.getItem('idToken')
            }
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
        case Actions.USER.DELETE_ACCOUNT:
          return {
            ...state,
            deleted: true
          }
        case Actions.USER.STOP_DELETE_ACCOUNT:
          return {
            ...state,
            deleted: false
          }
        case Actions.USER.SET_NOTIF:
          return {
            ...state,
            notifications: action.payload
          }
        case Actions.USER.SET_REQUESTS:
          return {
            ...state,
            requests: action.payload
          }
        default:
            return state;
    }
};

export default UserReducer;