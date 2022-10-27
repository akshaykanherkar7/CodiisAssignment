import * as types from "./video.actionTypes";
import axios from "axios";

export const uploadVideoAPI = (payload) => (dispatch) => {
  return axios
    .post("http://localhost:8080/video", payload)
    .then((res) => {
      return types.UPLOAD_VIDEO_SUCC;
    })
    .catch((err) => {
      console.log("err:", err);
      return types.UPLOAD_VIDEO_FAI;
    });
};
export const getVideoAPI = () => (dispatch) => {
  return axios
    .get("http://localhost:8080/video")
    .then((res) => {
      dispatch({ type: types.GET_VIDEO, payload: res.data });
    })
    .catch((err) => {
      console.log("err:", err);
    });
};
