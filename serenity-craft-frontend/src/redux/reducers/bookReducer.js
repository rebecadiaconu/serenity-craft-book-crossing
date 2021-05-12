import { Actions } from '../types';

const initialState = {
    books: []
};

const BookReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.BOOK.SET_BOOKS:
            return {
                books: action.payload
            };
        default:
            return state;
    }
};

export default BookReducer;