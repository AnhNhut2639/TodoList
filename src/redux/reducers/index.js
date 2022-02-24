import { combineReducers } from "redux";
import todoReducer from "./todolist";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export default rootReducer;
