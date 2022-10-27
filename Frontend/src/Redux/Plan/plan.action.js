import * as types from "./plan.actionTypes";
import axios from "axios";

export const addPlanAPI = (newplan) => (dispatch) => {
  dispatch({ type: types.ADD_PLAN_REQ });
  return axios
    .post("http://localhost:8080/plan", newplan)
    .then((res) => {
      console.log("res:", res);
      return types.ADD_PLAN_SUCC;
    })
    .catch((err) => {
      console.log("err:", err);
      return types.ADD_PLAN_FAI;
    });
};

export const getPlansAPI = () => (dispatch) => {
  dispatch({ type: types.GET_PLAN_REQ });
  return axios
    .get("http://localhost:8080/plan")
    .then((res) => {
      dispatch({ type: types.GET_PLAN_SUCC, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_PLAN_FAI });
    });
};

export const updatePlanAPI = (id, updatedPlan) => (dispatch) => {
  axios.patch(`http://localhost:8080/plan/${id}`, updatedPlan).then((res) => {
    console.log(res.data.updated_plan);
    dispatch({ type: types.UPDATE_PLAN, payload: res.data.updated_plan });
  });
};

export const deletePlanAPI = (id) => (dispatch) => {
  return axios.delete(`http://localhost:8080/plan/${id}`);
};
