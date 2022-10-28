import { FETCH_CATEGORIES, SET_CATEGORY } from "../types";

export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return [action.payload];

    default:
      return state;
  }
};
