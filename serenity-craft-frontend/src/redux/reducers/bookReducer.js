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
    searchValue: '',
    actual: '', // book | user | auth
    book: {},
    justAdded: false,
    edit: false,
    deleteBookNow: false
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
                sortApplied: true,
                sortValue: action.payload
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
        case Actions.BOOK.SET_ACTUAL:
            return {
                ...state,
                actual: action.payload
            }
        case Actions.BOOK.SET_BOOK:
            return {
                ...state,
                book: action.payload
            }
        case Actions.BOOK.DELETE_BOOK: 
            return {
                ...state,
                book: {}
            }
        case Actions.BOOK.ADD_BOOK:
            return {
                ...state,
                justAdded: true
            }
        case Actions.BOOK.DONE_ADDED:
            return {
                ...state,
                justAdded: false
            }
        case Actions.BOOK.DELETE:
            return {
                ...state,
                deleteBookNow: true
            }
        case Actions.BOOK.STOP_DELETE:
            return {
                ...state,
                deleteBookNow: false
            }
        case Actions.BOOK.EDIT:
            return {
                ...state,
                edit: true
            }
        case Actions.BOOK.STOP_EDIT:
            return {
                ...state,
                edit: false
            }
        default:
            return state;
    }
};

export default BookReducer;