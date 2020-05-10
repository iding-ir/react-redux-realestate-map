import { combineReducers } from "redux";

import filtersReducer from "./filters";
import placesReducer from "./places";
import slideReducer from "./slide";
import tourReducer from "./tour";
import pageReducer from "./page";

const combinedReducers = combineReducers({
  filters: filtersReducer,
  places: placesReducer,
  slide: slideReducer,
  tour: tourReducer,
  page: pageReducer,
});

export default combinedReducers;
