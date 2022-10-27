import * as types from "./plan.actionTypes";

const initialState = {
  plans: [],
  isLoading: false,
  isError: false,
};

export const planReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_PLAN_REQ: {
      return { ...state, isLoading: true, isError: false };
    }

    case types.GET_PLAN_SUCC: {
      return { ...state, isLoading: false, isError: false, plans: payload };
    }

    case types.GET_PLAN_FAI: {
      return { ...state, isLoading: false, isError: true };
    }

    case types.UPDATE_PLAN: {
      let upplan = state.plans.map((el) => {
        if (el._id === payload._id) {
          el = payload;
        }
        return el;
      });
      console.log(upplan);
      return { ...state, plans: upplan };
    }

    default: {
      return state;
    }
  }
};
