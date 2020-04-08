import { TOUR_TOGGLE, TOUR_SET } from "../constants";

export const toggleTour = (isTourActive) => {
  return {
    type: TOUR_TOGGLE,
    payload: { isTourActive },
  };
};

export const setTour = (tourIndex) => {
  return {
    type: TOUR_SET,
    payload: { tourIndex },
  };
};
