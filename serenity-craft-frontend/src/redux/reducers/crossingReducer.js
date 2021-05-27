import { Actions } from '../types';

const initialState = {
    crossingId: null,
    crossing: null,
    topicId: null,
    topic: null,
    viewTopic: false,
    editTopic: false,
    deleteTopic: false,
    deleteCrossing: false,
    addedReply: null
};

const CrossingReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.CROSSING.SET_CROSSING:
            return {
                crossingId: action.payload.crossingId,
                crossing: action.payload
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
        case Actions.CROSSING.DELETE_TOPIC:
            return {
                ...state,
                deleteTopic: true,
                topicId: action.payload.topicId,
                topic: action.payload
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