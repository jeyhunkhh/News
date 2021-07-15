import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { loginReducer } from "../Auth/reducer";
import { newsReducer } from "../News/reducer";
import { readlistReducer } from "../ReadList/reducer";

export const rootReducer = combineReducers({
  user: loginReducer,
  news: newsReducer,
  readlist: readlistReducer,
});

const middleware = [thunk];

const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
