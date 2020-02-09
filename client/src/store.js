import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};
let comp = null;
const middleWare = [thunk];

if (process.env.NODE_ENV !== "production") {
  comp = compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  comp = compose(applyMiddleware(...middleWare));
}

const store = createStore(rootReducer, initialState, comp);
// Redux dev tool:
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default store;
