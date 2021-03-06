export const Actions = {
    USER: {
        SET_AUTHENTICATED: "USER.SET_AUTHENTICATED",
        SET_UNAUTHENTICATED: "USER.SET_UNAUTHENTICATED",
        SET_USER: "USER.SET_USER",
        LOADING_USER: "USER.LOADING_USER",
        LOADING_IMAGE: "USER.LOADING_IMAGE",
        LOADING_DETAILS: "USER.LOADING_DETAILS",
        STOP_LOADING_USER: "USER.STOP_LOADING_USER",
        CHANGE_EMAIL: "USER.CHANGE_EMAIL",
        CHANGE_USERNAME: "USER.CHANGE_USERNAME",
        CHANGE_PASSWORD: "USER.CHANGE_PASSWORD",
        DELETE_ACCOUNT: "USER.DELETE_ACCOUNT",
        STOP_DELETE_ACCOUNT: "USER.STOP_DELETE_ACCOUNT",
        SET_NOTIF: "USER.SET_NOTIF",
        SET_REQUESTS: "USER.SET_REQ",
        SET_CROSSINGS: "USER.SET_CROSSINGS",
        SORT: "USER.SORT",
        SET_SEARCH_DATA: "USER.SET_SEARCH_DATA",
        STOP_SEARCH: "USER.STOP_SEARCH",
        SET_FAVS: "USER.SET_FAVS"
    },
    UI: {
        SET_ERRORS: "UI.SET_ERRORS",
        CLEAR_ERRORS: "UI.CLEAR_ERRORS",
        SET_ACTION_DONE: "UI.SET_ACTION_DONE",
        CLEAR_ACTION: "UI.CLEAR_ACTION",
        SEND_EMAIL: "UI.SEND_EMAIL",
        STOP_SEND_EMAIL: "UI.STOP_SEND_EMAIL",
        LOADING_DATA: 'UI.LOADING_DATA',
        LOADING_BUTTON: "UI.LOADING_BUTTON",
        STOP_LOADING_DATA: 'UI.STOP_LOADING_DATA',
        SCROLLING: "UI.SCROLLING",
        STOP_SCROLLING: "UI.STOP_SCROLLING",
        BACK_UP: "UI.BACK_UP",
        SET_USER: "UI.SET_USER",
        REMOVE_USER: "UI.REMOVE_USER",
        SEE_REQUEST: "UI.SEE_REQUEST",
        STOP_SEE_REQUEST: "UI.STOP_SEE_REQUEST",
        REPORT: "UI.REPORT",
        REPORT_REVIEW: "UI.REPORT_REVIEW",
        REPORT_CROSSING: "UI.REPORT_CROSSING",
        REPORT_TOPIC: "UI.REPORT_TOPIC",
        REPORT_REPLY: "UI.REPORT_REPLY",
        STOP_REPORT: "UI.STOP_REPORT",
        SETTINGS: "USER.SETTINGS",
        STOP_SETTINGS: "USER.STOP_SETTINGS"
    },
    BOOK: {
        SET_INIT: "BOOK.SET_INIT",
        SET_BOOKS: "BOOK.SET_BOOKS",
        SET_FILTER_DATA: "BOOK.SET_FILTER_DATA",
        REFRESH_FILTER: "BOOK.REFRESH_FILTER",
        SORT: "BOOK.SORT",
        SET_SEARCH_DATA: "BOOK.SET_SEARCH_DATA",
        STOP_SEARCH: "BOOK.STOP_SEARCH",
        SET_ACTUAL: "BOOK.SET_ACTUAL",
        ADD_BOOK: "BOOK.ADD_BOOK",
        DONE_ADDED: "BOOK.DONE_ADDED",
        SET_BOOK: "BOOK.SET_BOOK",
        DELETE: "BOOK.DELETE",
        STOP_DELETE: "BOOK.STOP_DELETE",
        EDIT: "BOOK.EDIT",
        STOP_EDIT: "BOOK.STOP_EDIT",
        REVIEW: "BOOK.REVIEW",
        STOP_REVIEW: "BOOK.STOP_REVIEW"
    },
    REVIEW: {
        REVIEW: "REVIEW.REVIEW",
        STOP_REVIEW: "REVIEW.STOP_REVIEW",
        EDIT_REVIEW: "REVIEW.EDIT_REVIEW",
        STOP_EDIT_REVIEW: "REVIEW.STOP_EDIT_REVIEW",
        DELETE_REVIEW: "REVIEW.DELETE_REVIEW",
        STOP_DELETE_REVIEW: "REVIEW.STOP_DELETE_REVIEW",
        SET_REVIEW: "REVIEW.SET_REVIEW"
    },
    CROSSING: {
        SET_RANDOM_BOOK: 'CROSSING.SET_RANDOM_BOOK',
        STOP_SET_RANDOM_BOOK: 'CROSSING.STOP_SET_RANDOM_BOOK',
        SEND_REQ: 'CROSSING.SEND_REQ',
        STOP_SEND_REQ: 'CROSSING.STOP_SEND_REQ',
        SET_CROSSING: "CROSSING.SET_CROSSING",
        CHANGE_BOOK: "CROSSING.CHANGE_BOOK",
        STOP_CHANGE_BOOK: "CROSSING.STOP_CHANGE_BOOK",
        ACCEPT: "CROSSING.ACCEPT",
        REJECT: "CROSSING.REJECT",
        CANCEL: "CROSSING.CANCEL",
        STOP_CANCEL: "CROSSING.STOP_CANCEL",
        DELETE_CROSSING: "CROSSING.DELETE_CROSSING",
        STOP_DELETE_CROSSING: "CROSSING.STOP_DELETE_CROSSING",
        ADD_TOPIC: "CROSSING.ADD_TOPIC",
        STOP_ADD_TOPIC: "CROSSING.STOP_ADD_TOPIC",
        VIEW_TOPIC: "CROSSING.VIEW_TOPIC",
        STOP_VIEW_TOPIC: "CROSSING.STOP_VIEW_TOPIC",
        EDIT_TOPIC: "CROSSING.EDIT_TOPIC",
        STOP_EDIT_TOPIC: "CROSSING.STOP_EDIT_TOPIC",
        DELETE_TOPIC: "CROSSING.DELETE_TOPIC",
        STOP_DELETE_TOPIC: "CROSSING.STOP_DELETE_TOPIC",
        ADD_REPLY: "CROSSING.ADD_REPLY"
    },
    ADMIN: {
        SET_ADMIN: "ADMIN.SET_ADMIN",
        LOG_OUT_ADMIN: "ADMIN.LOG_OUT_ADMIN",
        SET_INIT: "ADMIN.SET_INIT",
        SET_REPORTS: "ADMIN,SET_REPORTS",
        LOADING: "ADMIN.LOADING",
        LOADING_BUTTON: "ADMIN.LOADING_BUTTON",
        STOP_LOADING: "ADMIN.STOP_LOADING",
        ACCEPT: "ADMIN.ACCEPT",
        REJECT: "ADMIN.REJECT",
        MARK_SEEN: "ADMIN.MARK_SEEN",
        SEND_EMAIL: "ADMIN.SEND_EMAIL",
        SEE_REPORT: "ADMIN.SEE_REPORT",
        STOP_SEE_REPORT: "ADMIN.STOP_SEE_REPORT",
        ACCEPT: "ADMIN.ACCEPT",
        STOP_ACCEPT: "ADMIN.STOP_ACCEPT",
        SORT: "ADMIN.SORT",
        SET_SEARCH_DATA: "ADMIN.SET_SEARCH_DATA",
        STOP_SEARCH: "ADMIN.STOP_SEARCH",
    }
};