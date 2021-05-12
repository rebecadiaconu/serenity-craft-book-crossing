import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import UserReducer from "./reducers/userReducer";
import UiReducer from "./reducers/uiReducer";
import BookReducer from "./reducers/bookReducer";


const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: UserReducer,
  books: BookReducer,
  ui: UiReducer
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;