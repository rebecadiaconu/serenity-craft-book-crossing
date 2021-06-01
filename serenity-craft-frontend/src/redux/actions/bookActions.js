import axios from "../../util/axios";
import { Actions } from "../types";
import history from "util/history";


export const getAllBooks = () => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.get('/books')
    .then(({ data }) => {
        dispatch({
            type: Actions.BOOK.SET_ACTUAL,
            payload: 'book'
        });
        dispatch({ 
            type: Actions.BOOK.SET_INIT,
            payload: data 
        });
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        console.error(err);
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({
            type: Actions.BOOK.SET_INIT,
            payload: []
        });
    });
};


export const getBook = (bookId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.get(`/books/${bookId}`)
    .then(({ data }) => {
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({
            type: Actions.BOOK.SET_BOOK,
            payload: data
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};


export const deleteBook = (bookId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.delete(`/books/${bookId}`)
    .then(({ data }) => {
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getAllBooks());
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};


export const addBook = (formData) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post('/book', formData)
    .then(({ data }) => {
        dispatch({ type: Actions.UI.CLEAR_ERRORS });
        dispatch({
            type: Actions.BOOK.SET_BOOK,
            payload: data
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ type: Actions.BOOK.ADD_BOOK });
        history.push(`/admin/books/${data.bookId}`);
    })
    .catch((err) => {
        dispatch({ 
            type: Actions.UI.SET_ERRORS, 
            payload: err.response.data 
        });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    });
};

export const changeCoverImage = (formData, bookId, justAdded) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });

    axios.post(`/book/${bookId}/cover`, formData)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getBook(bookId));
        if (justAdded) dispatch({ type: Actions.BOOK.DONE_ADDED });
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const removeCover = (bookId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });

    axios.post(`/book/${bookId}/noCover`)
    .then(({ data }) => {
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getBook(bookId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const editBook = (formData, bookId) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    axios.post(`/books/${bookId}`, formData)
    .then(({ data }) =>{
        dispatch({ 
            type: Actions.UI.SET_ACTION_DONE,
            payload: data.message
        });
        dispatch(getBook(bookId));
        dispatch({ type: Actions.UI.CLEAR_ERRORS});
        dispatch({ type: Actions.BOOK.STOP_EDIT });
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
    })
    .catch((err) => {
        dispatch({ type: Actions.UI.STOP_LOADING_DATA });
        dispatch({ 
            type: Actions.UI.SET_ERRORS,
            payload: err.response.data
        });
    });
};


export const sortBooks = (value, books) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });
    switch(value) {
        case 0:
            books.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
            break
        case 1:
            books.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
            break
        case 2:
            books.sort((a, b) => (a.title > b.title ? 1 : -1));
            break
        case 3: 
            books.sort((a, b) => (a.title < b.title ? 1 : -1));
            break
        case 4:
            books.sort((a, b) => {
                return a.averageRating - b.averageRating;
            });
            break
        case 5:
            books.sort((a, b) => {
                return -(a.averageRating - b.averageRating);
            });
            break
        case 6:
            books.sort((a, b) => {
                return a.numReviews - b.numReviews;
            });
            break
        case 7:
            books.sort((a, b) => {
                return -(a.numReviews - b.numReviews);
            });
            break
        default:
            break;
    }

    dispatch({
        type: Actions.BOOK.SORT,
        payload: value
    });
    dispatch({
        type: Actions.BOOK.SET_BOOKS,
        payload: books
    });
    dispatch({ type: Actions.UI.STOP_LOADING_DATA });
};  


export const getFilterBooks = (books, filterData) => {
    let newBooks = [...books];

    // filter by authors
    if (filterData.author.length !== 0) {
        newBooks = newBooks.filter((book) => {
            return filterData.author.map((item) => item.toLowerCase()).includes(book.author.trim().toLowerCase());
        });
    }

    // filter by publishers
    if (filterData.publisher.length !== 0) {
        newBooks = newBooks.filter((book) => {
            return filterData.publisher.map((item) => item.toLowerCase()).includes(book.publisher.trim().toLowerCase());
        });
    }

    // filter by languages
    if (filterData.language.length !== 0) {
        newBooks = newBooks.filter((book) => {
            return filterData.language.map((item) => item.toLowerCase()).includes(book.language.trim().toLowerCase());
        });
    }

    // filter by genres
    if (filterData.genre.length !== 0) {
        newBooks = newBooks.filter((book) => {
            return filterData.language.some((genre) => book.genres.indexOf(genre) >= 0);
        });
    }

    // filter by minimum rating
    if (filterData.ratingMin) {
        newBooks = newBooks.filter((book) => {
            return  book.averageRating >= filterData.ratingMin;
        });
    }

    return newBooks;
};


export const setFilterData = (books, data, type, filterData) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });

    if (!(!!filterData)) filterData = {
        author: [],
        publisher: [],
        language: [],
        genre: [],
        ratingMin: 0
    };

    switch(type) {
        case "author":
            filterData.author = data;
            break
        case "ratingMin":
            filterData.ratingMin = data[0];
            break
        case "publisher": 
            filterData.publisher = data;
            break
        case "genre":
            filterData.genre = data;
            break
        case "language":
            filterData.language = data;
            break
        default:
            break;
    }

    let newbooks = getFilterBooks(books, filterData);

    dispatch({
        type: Actions.BOOK.SET_FILTER_DATA,
        payload: filterData
    });
    dispatch({
        type: Actions.BOOK.SET_BOOKS,
        payload: newbooks
    });        

    dispatch({ type: Actions.UI.STOP_LOADING_DATA });
};


export const setSearchValue = (data, books) => (dispatch) => {
    dispatch({ type: Actions.UI.LOADING_DATA });

    if(!!data) {
        let newBooks = books.filter((book) => {
            return (book.title.toLowerCase().includes(data.toLowerCase()) || book.author.toLowerCase().includes(data.toLowerCase()));
        });

        dispatch({
            type: Actions.BOOK.SET_BOOKS,
            payload: newBooks
        }); 
        dispatch({
            type: Actions.BOOK.SET_SEARCH_DATA,
            payload: data
        });
    }
    else dispatch({ type: Actions.BOOK.STOP_SEARCH });
    dispatch({ type: Actions.UI.STOP_LOADING_DATA });
};
 