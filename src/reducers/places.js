import { PLACES_SET } from "../constants";

const defaultState = {
  type: "FeatureCollection",
  features: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case PLACES_SET:
      return action.payload.places;
    default:
      return state;
  }
};

export default reducer;
