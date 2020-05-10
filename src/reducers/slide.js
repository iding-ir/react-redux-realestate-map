import { SLIDE_TOGGLE } from "../constants";

const INITIAL_STATE = {
  isSlideActive: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SLIDE_TOGGLE:
      return {
        ...state,
        isSlideActive: action.payload.isSlideActive,
      };
    default:
      return state;
  }
};

export default reducer;
