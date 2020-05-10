import { PLACES_SET } from "../constants";

const INITIAL_STATE = {
  type: "FeatureCollection",
  features: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLACES_SET:
      return action.payload.places;
    default:
      return state;
  }
};

export default reducer;
