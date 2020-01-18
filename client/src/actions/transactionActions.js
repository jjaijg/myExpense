import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION
} from "../actions/types";

export const getTransactions = () => ({
  type: GET_TRANSACTIONS
});

export const addTransaction = newTransaction => ({
  type: ADD_TRANSACTION,
  payload: newTransaction
});

export const deleteTransaction = id => ({
  type: DELETE_TRANSACTION,
  payload: id
});
