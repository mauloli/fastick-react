import { combineReducers } from "redux";

import movie from "./movie";
import schedule from "./schedule";
import auth from "./auth";

export default combineReducers({
  movie,
  schedule,
  auth
});
