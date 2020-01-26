import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// RETURN ERRORS
export const returnErrors = (msg, status, id = null, success = false) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, success, id }
  };
};
// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
