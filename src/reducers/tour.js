import { TOUR_TOGGLE, TOUR_SET } from "../constants";

const defaultState = {
  isTourActive: false,
  tourIndex: 0,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOUR_TOGGLE:
      return {
        ...state,
        isTourActive: action.payload.isTourActive,
      };
    case TOUR_SET:
      return {
        ...state,
        tourIndex: action.payload.tourIndex,
      };
    default:
      return state;
  }
};

export default reducer;
