import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import UserReducer from "./reducers/userReducer";
import BooksReducer from "./reducers/booksReducer";
import UiReducer from "./reducers/uiReducer";


const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: UserReducer,
  books: BooksReducer,
  ui: UiReducer
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;