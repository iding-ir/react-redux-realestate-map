import filters from "./filters";
import places from "./places";
import slide from "./slide";
import tour from "./tour";
import page from "./page";
import { combineReducers } from "redux";

const combinedReducers = combineReducers({
  filters,
  places,
  slide,
  tour,
  page,
});

export default combinedReducers;
