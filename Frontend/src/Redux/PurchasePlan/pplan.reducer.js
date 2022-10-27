import * as types from "./pplan.actionTypes";

const initialState = {
  purchasedplan: [],
  isLoading: false,
  isError: false,
};

export const pplanReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_PURCHASED_PLAN: {
      return { ...state, purchasedplan: payload };
    }

    default: {
      return state;
    }
  }
};
