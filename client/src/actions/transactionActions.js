import axios from "axios";
import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  TRANSACTIONS_LOADING
} from "../actions/types";
import { connect } from "react-redux";

export const setTransactionsLoading = () => ({
  type: TRANSACTIONS_LOADING
});

export const getTransactions = () => dispatch => {
  // Make Transactions loading true
  dispatch(setTransactionsLoading());

  // get transaction from server
  axios.get("/api/transactions").then(res =>
    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data
    })
  );
};

export const addTransaction = newTransaction => dispatch => {
  // Add transaction
  axios.post("/api/transactions", newTransaction).then(res =>
    dispatch({
      type: ADD_TRANSACTION,
      payload: res.data
    })
  );
};

export const deleteTransaction = id => dispatch => {
  axios.delete(`/api/transactions/${id}`).then(res => {
    console.log(res.data);
    dispatch({
      type: DELETE_TRANSACTION,
      payload: id
    });
  });
};
