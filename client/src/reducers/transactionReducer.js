import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  FILTER_TRANSACTIONS,
  DELETE_TRANSACTION,
  TRANSACTIONS_LOADING,
  CONFIRM_DELETE,
  RESET_DELETE
} from "../actions/types";

import { compare } from "../helper";

const initialState = {
  transactions: [],
  filteredTransactions: [],
  loading: false,
  confirmDelete: false
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
    case FILTER_TRANSACTIONS:
      return {
        ...state,
        filteredTransactions: action.payload,
        loading: false
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions].sort(compare),
        loading: false
      };
    case CONFIRM_DELETE:
      return {
        ...state,
        confirmDelete: true
      };
    case RESET_DELETE:
      return {
        ...state,
        confirmDelete: false
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
