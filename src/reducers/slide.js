import { SLIDE_TOGGLE } from "../constants";

const defaultState = {
  isSlideActive: false,
};

const reducer = (state = defaultState, action) => {
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
