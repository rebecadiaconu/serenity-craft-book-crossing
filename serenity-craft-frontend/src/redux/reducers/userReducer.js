import { Actions } from '../types';

const initialState = {
    authenticated: !!localStorage.getItem('idToken'),
    loading: false,
    loadingImage: false,
    loadingDetails: false,
    deleted: false,
    credentials: {},
    books: [],
    initCrossings: [],
    crossings: [],
    requests: [],
    notifications: [],
    searchApplied: false,
    searchValue: '',
    sortApplied: false,
    sortValueCrossings: 0,
    favBooks: []
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
              initCrossings: action.payload.crossings,
              authenticated: true,
              loading: false,
              ...action.payload,
            };
        case Actions.USER.LOADING_USER:
            return {
              ...state,
              loading: true
            };
        case Actions.USER.LOADING_IMAGE:
            return {
              ...state,
              loadingImage: true
            };
        case Actions.USER.LOADING_DETAILS:
            return {
              ...state,
              loadingDetails: true
            }
        case Actions.USER.STOP_LOADING_USER:
            return {
              ...state,
              loading: false,
              loadingImage: false,
              loadingDetails: false
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
        case Actions.USER.SET_CROSSINGS:
          return {
            ...state,
            crossings: action.payload
          }
        case Actions.USER.SORT:
          return {
              ...state,
              sortApplied: true,
              sortValueCrossings: action.payload
          };
        case Actions.USER.SET_SEARCH_DATA:
          return {
              ...state,
              searchApplied: true,
              searchValue: action.payload
          }
        case Actions.USER.STOP_SEARCH:
          return {
              ...state,
              searchApplied: false,
              searchValue: '',
              crossings: state.initCrossings
          }
        case Actions.USER.SET_FAVS:
          return {
            ...state,
            favBooks: action.payload
          }
        default:
            return state;
    }
};

export default UserReducer;