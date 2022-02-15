import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from './session';
import songReducer from "./song";
import commentsReducer from "./comments";
import userReducer from "./singleUser";
import currentlyPlayingReducer from "./currentlyPlaying";

const rootReducer = combineReducers({
  session: sessionReducer,
  songState: songReducer,
  commentState: commentsReducer,
  userState: userReducer,
  current: currentlyPlayingReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
