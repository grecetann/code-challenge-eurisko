import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import loginReducer from "./loginReducer";


const reducers = combineReducers({
  auth: loginReducer,
  article:articleReducer,
});
export default reducers;