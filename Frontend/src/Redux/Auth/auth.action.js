import * as types from "./auth.actionTypes";
import axios from "axios";

export const userRegisterAPI = (payload) => (dispatch) => {
  return axios
    .post("http://localhost:8080/user/register", payload)
    .then((res) => {
      console.log("res:", res);
      return types.REGISTER_SUCC;
    })
    .catch((err) => {
      console.log("err:", err.response.data.message);
      dispatch({ type: types.ERROR, payload: err.response.data.message });
      return types.ERROR;
    });
};

export const userLoginAPI = (creds) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQ });
  return axios
    .post("http://localhost:8080/user/login", creds)
    .then((res) => {
      dispatch({ type: types.LOGIN_SUCC, payload: res.data.data });
      return types.LOGIN_SUCC;
    })
    .catch((err) => {
      console.log("err:", err.response.data.message);
      dispatch({ type: types.ERROR, payload: err.response.data.message });
      return types.ERROR;
    });
};

export const logOut = () => (dispatch) => {
  dispatch({ type: types.LOGOUT });
};
