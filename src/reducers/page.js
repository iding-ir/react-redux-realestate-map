import { PAGE_TOGGLE, PAGE_SET } from "../constants";

const INITIAL_STATE = {
  isPageActive: false,
  page: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAGE_TOGGLE:
      return {
        ...state,
        isPageActive: action.payload.isPageActive,
      };
    case PAGE_SET:
      return {
        ...state,
        page: action.payload.page,
      };
    default:
      return state;
  }
};

export default reducer;
