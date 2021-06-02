import { Actions } from '../types';

const initialState = {
    admin: false,
    initReports: [],
    reports: [],
    report: null,
    searchValue: '',
    searchApplied: false,
    sortApplied: false,
    sortValue: 0,
    view: false,
    accept: false
};

const AdminReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.ADMIN.SET_ADMIN:
            return {
                ...state,
                admin: true
            };
        case Actions.ADMIN.LOG_OUT_ADMIN:
            return {
                ...state,
                admin: false,
                reports: [],
                initReports: []
            };
        case Actions.ADMIN.SET_INIT:
            return {
                ...state,
                initReports: action.payload,
                reports: action.payload
            };
        case Actions.ADMIN.SET_REPORTS:
            return {
                ...state,
                reports: action.payload
            }
        case Actions.ADMIN.SEE_REPORT:
            return {
                ...state,
                view: true,
                report: action.payload
            }
        case Actions.ADMIN.STOP_SEE_REPORT:
            return {
                ...state,
                view: false,
                report: null
            }
        case Actions.ADMIN.ACCEPT:
            return {
                ...state,
                accept: true,
                report: action.payload
            }
        case Actions.ADMIN.STOP_ACCEPT:
            return {
                ...state,
                accept: false,
                report: null
            }
        case Actions.ADMIN.SORT:
            return {
                ...state,
                sortApplied: true,
                sortValue: action.payload
            };
        case Actions.ADMIN.SET_SEARCH_DATA:
            return {
                ...state,
                searchApplied: true,
                searchValue: action.payload
            }
        case Actions.ADMIN.STOP_SEARCH:
            return {
                ...state,
                searchApplied: false,
                searchValue: '',
                reports: state.initReports
            }
        default:
            return state;   
    }
};

export default AdminReducer;