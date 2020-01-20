import axios from "axios";
import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  TRANSACTIONS_LOADING
} from "../actions/types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const setTransactionsLoading = () => ({
  type: TRANSACTIONS_LOADING
});

export const getTransactions = () => (dispatch, getState) => {
  // Make Transactions loading true
  dispatch(setTransactionsLoading());

  // get transaction from server
  axios
    .get("/api/transactions", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addTransaction = newTransaction => (dispatch, getState) => {
  // Add transactions
  axios
    .post("/api/transactions", newTransaction, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteTransaction = id => (dispatch, getState) => {
  axios
    .delete(`/api/transactions/${id}`, tokenConfig(getState))
    .then(res => {
      console.log(res.data);
      dispatch({
        type: DELETE_TRANSACTION,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
