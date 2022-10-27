import * as types from "./video.actionTypes";

const initialState = {
  videoData: [],
  isLoading: false,
  isError: false,
};

export const videoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_VIDEO: {
      return { ...state, videoData: payload };
    }

    default: {
      return state;
    }
  }
};
