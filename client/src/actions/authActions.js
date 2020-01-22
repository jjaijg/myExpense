import axios from "axios";
import { returnErrors } from "./errorActions";
import { getTransactions } from "./transactionActions";
import {
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR
} from "./types";

// CHECK TOKEN AND USER
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  const headerConfig = tokenConfig(getState);
  axios
    .get("/api/auth/user", headerConfig)
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// REGISTER USER
export const register = ({ name, email, password }) => dispatch => {
  // CONFIG HEADERS
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  // CREATE NEW USER
  const body = JSON.stringify({
    name,
    email,
    password
  });
  // User loading
  dispatch({
    type: USER_LOADING
  });
  // Call Api
  axios
    .post("/api/users", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(getTransactions());
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// LOGIN USER
export const login = ({ email, password }) => dispatch => {
  // CONFIG HEADERS
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  //LOGIN
  const body = JSON.stringify({
    email,
    password
  });
  // User loading
  dispatch({
    type: USER_LOADING
  });
  // call api
  axios
    .post("/api/auth", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(getTransactions());
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// LOGOUT USER
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// SETUP CONFIG/HEADERS & TOKEN
export const tokenConfig = getState => {
  // get token from local
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  // if token add it to header
  if (token) config.headers["x-auth-token"] = token;

  return config;
};
