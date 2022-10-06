import { homeReducer } from "./home";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  homeReducer,
});

export default rootReducer;
