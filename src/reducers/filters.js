import {
  KINDS_SET,
  ROOMS_SET,
  AREAS_SET,
  RENTS_SET,
  DEPOSITS_SET,
} from "../constants";

const INITIAL_STATE = {
  kinds: [
    { slug: "house", name: "House", checked: true },
    { slug: "apartment", name: "Apartment", checked: true },
    { slug: "shared", name: "Shared", checked: true },
    { slug: "dorm", name: "Dorm", checked: true },
  ],
  rooms: [
    { slug: "one", name: "One", checked: false },
    { slug: "two", name: "Two", checked: false },
    { slug: "more", name: "More", checked: false },
    { slug: "any", name: "Any", checked: true },
  ],
  areas: {
    from: 30,
    to: 150,
  },
  rents: {
    from: 5000,
    to: 20000,
  },
  deposits: {
    from: 10000,
    to: 100000,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case KINDS_SET:
      state.kinds.map((item) => {
        if (item.slug === action.payload.slug) {
          item.checked = action.payload.checked;
        }

        return item;
      });

      return state;
    case ROOMS_SET:
      state.rooms.map((item) => {
        item.checked = item.slug === action.payload.slug;

        return item;
      });

      return state;
    case AREAS_SET:
      state.areas.from = action.payload.from;
      state.areas.to = action.payload.to;

      return state;
    case RENTS_SET:
      state.rents.from = action.payload.from;
      state.rents.to = action.payload.to;

      return state;
    case DEPOSITS_SET:
      state.deposits.from = action.payload.from;
      state.deposits.to = action.payload.to;

      return state;
    default:
      return state;
  }
};

export default reducer;
