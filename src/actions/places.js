import { PLACES_SET } from "../constants";

export const setPlaces = (places) => {
  return {
    type: PLACES_SET,
    payload: { places },
  };
};
