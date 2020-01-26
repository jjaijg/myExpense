import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  VERIFY_SUCCESS,
  VERIFY_FAIL
} from "./types";

// CHECK TOKEN AND USER
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  const headerConfig = tokenConfig(getState);
  axios
    .get("/api/auth/user", headerConfig)
    .then(res => {
      const { user } = res.data;
      dispatch({
        type: USER_LOADED,
        payload: user
      });
    })
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
      const { status, success, id } = res.data;
      dispatch({
        type: REGISTER_SUCCESS
      });
      dispatch(returnErrors(res.data, status, id, success));
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

// VERIFY USER
export const verifyAccount = (email, token) => dispatch => {
  // CONFIG HEADERS
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  // CREATE COFIRM OBJECT
  const body = {
    email,
    token
  };
  // User loading
  dispatch({
    type: USER_LOADING
  });
  axios
    .post("/api/users/confirmation", body, config)
    .then(res => {
      const { token, user } = res.data;
      dispatch({
        type: VERIFY_SUCCESS,
        payload: { token, user }
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "VERIFY_FAIL")
      );
      dispatch({
        type: VERIFY_FAIL
      });
    });
};

// RESEND VERIFY LINK
export const sendVerifyLink = (email, token) => dispatch => {
  // CONFIG HEADERS
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  // CREATE COFIRM OBJECT
  const body = {
    email
  };

  axios
    .post("/api/users/resend", body, config)
    .then(res => {
      const { msg, status, success, id } = res.data;
      dispatch(returnErrors({ msg }, status, id, success));
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EMAIL_VERIFY_FAIL"
        )
      );
      dispatch({
        type: VERIFY_FAIL
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
