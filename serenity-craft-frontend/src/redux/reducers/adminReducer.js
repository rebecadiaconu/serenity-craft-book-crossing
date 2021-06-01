import { Actions } from '../types';

const initialState = {
    admin: false,
    initReports: [],
    reports: [],
    searchValue: '',
    searchApplied: false,
    sortApplied: false,
    sortValue: 0
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
        default:
            return state;   
    }
};

export default AdminReducer;