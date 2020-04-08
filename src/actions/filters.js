import {
  KINDS_SET,
  ROOMS_SET,
  AREAS_SET,
  RENTS_SET,
  DEPOSITS_SET,
} from "../constants";

export const setType = (slug, checked) => {
  return {
    type: KINDS_SET,
    payload: { slug, checked },
  };
};

export const setRoom = (slug) => {
  return {
    type: ROOMS_SET,
    payload: { slug },
  };
};

export const setArea = (from, to) => {
  return {
    type: AREAS_SET,
    payload: { from, to },
  };
};

export const setRent = (from, to) => {
  return {
    type: RENTS_SET,
    payload: { from, to },
  };
};

export const setDeposit = (from, to) => {
  return {
    type: DEPOSITS_SET,
    payload: { from, to },
  };
};
