import { TOUR_TOGGLE, TOUR_SET } from "../constants";

const INITIAL_STATE = {
  isTourActive: false,
  tourIndex: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
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
