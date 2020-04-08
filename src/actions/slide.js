import { SLIDE_TOGGLE } from "../constants";

export const toggleSlide = (isSlideActive) => {
  return {
    type: SLIDE_TOGGLE,
    payload: { isSlideActive },
  };
};
