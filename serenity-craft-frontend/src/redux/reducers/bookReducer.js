import { Actions } from '../types';

const initialState = {
    books: [],
    initBooks: [],
    sortApplied: false,
    sortValue: 0,
    filterApplied: false,
    filterData :{
        author: [],
        publisher: [],
        language: [],
        genre: [],
        ratingMin: 0
    },
    searchApplied: false,
    searchValue: ''
};

const BookReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.BOOK.SET_INIT:
            return {
                ...state,
                initBooks: action.payload,
                books: action.payload
            }
        case Actions.BOOK.SET_BOOKS:
            return {
                ...state,
                books: action.payload
            };
        case Actions.BOOK.SORT:
            return {
                ...state,
                sort: true,
                sorValue: action.payload
            };
        case Actions.BOOK.SET_FILTER_DATA:
            return {
                ...state,
                filterApplied: true,
                filterData: action.payload
            }
        case Actions.BOOK.REFRESH_FILTER:
            return {
                ...state,
                filterApplied: false,
                books: state.initBooks,
                filterData: null
            }
        case Actions.BOOK.SET_SEARCH_DATA:
            return {
                ...state,
                searchApplied: true,
                searchValue: action.payload
            }
        case Actions.BOOK.STOP_SEARCH:
            return {
                ...state,
                searchApplied: false,
                searchValue: '',
                books: state.initBooks
            }
        default:
            return state;
    }
};

export default BookReducer;