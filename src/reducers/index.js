import { combineReducers } from "redux";

import filters from "./filters";
import places from "./places";
import slide from "./slide";
import tour from "./tour";
import page from "./page";

const combinedReducers = combineReducers({
  filters,
  places,
  slide,
  tour,
  page,
});

export default combinedReducers;
