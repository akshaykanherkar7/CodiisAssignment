import * as types from "./pplan.actionTypes";
import axios from "axios";

export const purchasePlanAPI = (plan) => (dispatch) => {
  return axios
    .post("http://localhost:8080/buyedplan", plan)
    .then((res) => {
      return types.PURCHASE_PLAN_SUCC;
    })
    .catch((err) => {
      console.log("err:", err);
      return types.PURCHASE_PLAN_FAI;
    });
};

export const getPurPlanAPI = () => (dispatch) => {
  return axios
    .get("http://localhost:8080/buyedplan")
    .then((res) => {
      dispatch({ type: types.GET_PURCHASED_PLAN, payload: res.data });
    })
    .catch((err) => {
      console.log("err:", err);
    });
};
