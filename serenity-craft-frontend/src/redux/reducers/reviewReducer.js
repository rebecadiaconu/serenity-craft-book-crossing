import { Actions } from '../types';

const initialState = {
    addReview: false,
    editReview: false,
    deleteReview: false,
    reviewId: null,
    reviewData: null
};

const ReviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.REVIEW.SET_REVIEW: {
            return {
                ...state,
                reviewData: action.payload
            }
        }
        case Actions.REVIEW.REVIEW:
            return {
                ...state,
                addReview: true
            }
        case Actions.REVIEW.STOP_REVIEW:
            return {
                ...state,
                addReview: false
            }
        case Actions.REVIEW.EDIT_REVIEW:
            return {
                ...state,
                editReview: true,
                reviewId: action.payload
            }
        case Actions.REVIEW.STOP_EDIT_REVIEW:
            return {
                ...state,
                editReview: false,
                reviewId: null
            }
            case Actions.REVIEW.DELETE_REVIEW:
        return {
            ...state,
            deleteReview: true,
            reviewId: action.payload
        }
        case Actions.REVIEW.STOP_DELETE_REVIEW:
            return {
                ...state,
                deleteReview: false,
                reviewId: null
            }
        default:
            return state;
    }
};

export default ReviewReducer;