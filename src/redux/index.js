import { combineReducers } from "redux";
import loginReducers from "./Authentication/reducers/Reducers";

const rootReducers = combineReducers({
  login: loginReducers,
});
export default rootReducers;
