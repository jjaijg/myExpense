import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  VERIFY_FAIL,
  VERIFY_SUCCESS,
  VERIFY_LOADING,
  CONFIRM_FAIL,
  CONFRIM_LOADING,
  CONFIRM_SUCCESS
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case VERIFY_LOADING:
      return {
        ...state,
        isVerifying: true
      };
    case CONFRIM_LOADING:
      return {
        ...state,
        isConfirming: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case CONFIRM_SUCCESS:
      return {
        ...state,
        isConfirming: false
      };
    case LOGIN_SUCCESS:
    case VERIFY_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload, // CONTAINS TOKEN & USER
        isAuthenticated: true,
        isLoading: false,
        isVerifying: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case VERIFY_FAIL:
    case CONFIRM_FAIL:
      localStorage.removeItem("token");
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isVerifying: false,
        isConfirming: false
      };
    default:
      return state;
  }
};
