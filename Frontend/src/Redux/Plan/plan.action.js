import * as types from "./plan.actionTypes";
import axios from "axios";

export const addPlanAPI = (newplan) => (dispatch) => {
  dispatch({ type: types.ADD_PLAN_REQ });
  return axios
    .post("https://salty-forest-18051.herokuapp.com/plan", newplan)
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
    .get("https://salty-forest-18051.herokuapp.com/plan")
    .then((res) => {
      dispatch({ type: types.GET_PLAN_SUCC, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_PLAN_FAI });
    });
};

export const updatePlanAPI = (id, updatedPlan) => (dispatch) => {
  axios.patch(`https://salty-forest-18051.herokuapp.com/plan/${id}`, updatedPlan).then((res) => {
    console.log(res.data.updated_plan);
    dispatch({ type: types.UPDATE_PLAN, payload: res.data.updated_plan });
  });
};

export const deletePlanAPI = (id) => (dispatch) => {
  return axios.delete(`https://salty-forest-18051.herokuapp.com/plan/${id}`);
};
