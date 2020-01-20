import { combineReducers } from "redux";

import transactionReducer from "./transactionReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  transaction: transactionReducer,
  auth: authReducer,
  error: errorReducer
});
