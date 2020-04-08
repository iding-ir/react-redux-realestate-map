import { PAGE_TOGGLE, PAGE_SET } from "../constants";

export const togglePage = (isPageActive) => {
  return {
    type: PAGE_TOGGLE,
    payload: { isPageActive },
  };
};

export const setPage = (page) => {
  return {
    type: PAGE_SET,
    payload: { page },
  };
};
