import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_CATEGORY } from "../types";

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export const filteredProductsReducer = (state = [], action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_CATEGORY:
      return action.payload;

    default:
      return state;
  }
};
