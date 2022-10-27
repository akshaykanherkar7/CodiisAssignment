import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { planReducer } from "./Plan/plan.reducer";
import { pplanReducer } from "./PurchasePlan/pplan.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  plan: planReducer,
  pplan: pplanReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
