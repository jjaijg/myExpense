import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION
} from "../actions/types";

export const getTransactions = () => ({
  type: GET_TRANSACTIONS
});
