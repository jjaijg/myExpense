import uuid from "uuid";

import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION
} from "../actions/types";

const initialState = {
  transactions: [
    {
      id: uuid(),
      doneBy: uuid(),
      expense: 100,
      doneFor: "milk",
      doneAt: new Date()
    },
    {
      id: uuid(),
      doneBy: uuid(),
      expense: 100,
      doneFor: "milk",
      doneAt: new Date()
    },
    {
      id: uuid(),
      doneBy: uuid(),
      expense: 200,
      doneFor: "milk",
      doneAt: new Date()
    },
    {
      id: uuid(),
      doneBy: uuid(),
      expense: 300,
      doneFor: "ghee",
      doneAt: new Date()
    },
    {
      id: uuid(),
      doneBy: uuid(),
      expense: 400,
      doneFor: "milk",
      doneAt: new Date()
    },
    {
      id: uuid(),
      doneBy: uuid(),
      expense: 500,
      doneFor: "veg",
      doneAt: new Date()
    },
    {
      id: uuid(),
      doneBy: uuid(),
      expense: 200,
      doneFor: "milk",
      doneAt: new Date()
    },
    {
      id: uuid(),
      doneBy: uuid(),
      expense: 300,
      doneFor: "ghee",
      doneAt: new Date()
    },
    {
      id: uuid(),
      doneBy: uuid(),
      expense: 400,
      doneFor: "milk",
      doneAt: new Date()
    },
    {
      id: uuid(),
      doneBy: uuid(),
      expense: 500,
      doneFor: "veg",
      doneAt: new Date()
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return { ...state };
    case ADD_TRANSACTION:
      return state;
    case DELETE_TRANSACTION:
      return state;
    default:
      return state;
  }
};
