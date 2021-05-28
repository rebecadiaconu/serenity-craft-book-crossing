import { Actions } from '../types';

const initialState = {
    crossingId: null,
    crossing: null,
    topicId: null,
    topic: null,
    cancel: false,
    deleteCross: false,
    changeBook: false,
    newbookId: null,
    addTopic: false,
    viewTopic: false,
    editTopic: false,
    deleteTopicVar: false,
    addedReply: null
};

const CrossingReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.CROSSING.SET_CROSSING:
            return {
                ...state,
                crossingId: action.payload.crossingId,
                crossing: action.payload
            }
        case Actions.CROSSING.CANCEL:
            return {
                ...state,
                cancel: true
            }
        case Actions.CROSSING.STOP_CANCEL:
            return {
                ...state,
                cancel: false
            }
        case Actions.CROSSING.DELETE_CROSSING:
            return {
                ...state,
                deleteCross: true
            };
        case Actions.CROSSING.STOP_DELETE_CROSSING:
            return {
                ...state,
                deleteCross: false
            };
        case Actions.CROSSING.CHANGE_BOOK:
            return {
                ...state,
                changeBook: true
            }
        case Actions.CROSSING.STOP_CHANGE_BOOK:
            return {
                ...state,
                changeBook: false
            }
        case Actions.CROSSING.ADD_TOPIC:
            return {
                ...state,
                addTopic: true
            }
        case Actions.CROSSING.STOP_ADD_TOPIC: 
            return {
                ...state,
                addTopic: false
            }
        case Actions.CROSSING.VIEW_TOPIC:
            return {
                ...state,
                viewTopic: true,
                topicId: action.payload.topicId,
                topic: action.payload
            }
        case Actions.CROSSING.STOP_VIEW_TOPIC: 
            return {
                ...state,
                viewTopic: false,
                topicId: null,
                topic: null
            }
        case Actions.CROSSING.EDIT_TOPIC:
            return {
                ...state,
                editTopic: true,
                topicId: action.payload.topicId,
                topic: action.payload
            }
        case Actions.CROSSING.STOP_EDIT_TOPIC:
            return {
                ...state,
                editTopic: false,
                topicId: null,
                topic: null
            }
        case Actions.CROSSING.DELETE_TOPIC:
            return {
                ...state,
                deleteTopicVar: true,
                topicId: action.payload.topicId,
                topic: action.payload
            }
        case Actions.CROSSING.STOP_DELETE_TOPIC:
            return {
                ...state,
                deleteTopicVar: false,
                topicId: null,
                topic: null
            }
        case Actions.CROSSING.ADD_REPLY:
            return {
                ...state,
                addedReply: action.payload
            }
        default: {
            return state;
        }
    }
};

export default CrossingReducer;