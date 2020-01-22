import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  TRANSACTIONS_LOADING
} from "../actions/types";

import { compare } from "../helper";

const initialState = {
  transactions: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions].sort(compare),
        loading: false
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          ({ _id }) => _id !== action.payload
        )
      };
    default:
      return state;
  }
};
