import axios from "axios";
import {
  GET_TRANSACTIONS,
  FILTER_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  TRANSACTIONS_LOADING,
  CONFIRM_DELETE,
  RESET_DELETE
} from "../actions/types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { searchByPurpose } from "../helper/search";

export const setTransactionsLoading = () => ({
  type: TRANSACTIONS_LOADING
});

export const filterTransactions = (transactions, searchKey) => dispatch => {
  searchKey = searchKey.toLowerCase().trim();
  dispatch({
    type: FILTER_TRANSACTIONS,
    payload: searchByPurpose(transactions, searchKey)
  });
};

export const getTransactions = () => (dispatch, getState) => {
  // Make Transactions loading true
  dispatch(setTransactionsLoading());

  // get transaction from server
  axios
    .get("/api/transactions", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addTransaction = newTransaction => (dispatch, getState) => {
  // Set transaction Loading
  dispatch(setTransactionsLoading());
  // Add transactions
  axios
    .post("/api/transactions", newTransaction, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const confirmDelete = id => dispatch => {
  dispatch({
    type: CONFIRM_DELETE
  });
  dispatch(deleteTransaction(id));
};
export const resetDelete = () => ({
  type: RESET_DELETE
});

export const deleteTransaction = id => (dispatch, getState) => {
  axios
    .delete(`/api/transactions/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_TRANSACTION,
        payload: id
      });
      dispatch(resetDelete());
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
