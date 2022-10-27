import * as types from "./auth.actionTypes";

const initialState = {
  isAuth: false,
  isLoading: false,
  isError: false,
  userData: [],
  ErrorMsh: "",
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_REQ: {
      return { ...state, isLoading: true, isError: false };
    }

    case types.LOGIN_SUCC: {
      localStorage.setItem("User", JSON.stringify(payload));
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        userData: payload,
      };
    }

    case types.LOGIN_FAI: {
      return { ...state, isLoading: false, isError: true, ErrorMsh: payload };
    }

    case types.ERROR: {
      return { ...state, ErrorMsh: payload };
    }

    case types.LOGOUT: {
      return { ...state, userData: [], isAuth: false };
    }

    default: {
      return state;
    }
  }
};
